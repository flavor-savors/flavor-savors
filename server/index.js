// require('dotenv').config()
const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json') // move to env
const { json } = require('body-parser')
const cors = require('cors')
const redis = require('redis')
const client = redis.createClient('6379', '174.12.0.3')
const multer = require('multer')
const upload = multer() // give us access to req.file
const app = express()

const rc = require('./controllers/recipes_controller')
const ac = require('./controllers/auth_controller')
const uc = require('./controllers/user_controller')
const fc = require('./controllers/forum_controller')
const pc = require('./controllers/plan_controller')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://flavor-savor.firebaseio.com',
})

const db = admin.firestore()
app.set('db', db)
app.set('admin', admin)
app.set('client', client)

// middleware
app.use(json())
app.use(cors())
app.use((req, res, next) => {
	console.log('\x1b[36m%s\x1b[0m', '\t[ - ] updating cache....')
	init()
	console.log('\x1b[32m', '\t[ + ] cache updated!')
	next()
})

//////////////////////////
//  TODO:
//		+ Get Grocery list
//

// auth routes
app.post('/register', ac.register_user) // Sign a user up

// recipe routes
app.get('/recipes/all', rc.get_all_recipes) // get all recipes ✔️
app.get('/recipes', rc.get_public_recipes) // get all public recipes ✔️
app.get('/recipes/id/:id', rc.get_recipe_by_id) // get recipe by id ✔️
app.get('/recipes/:uid', rc.get_recipe_by_user) // get recipes for a user ✔️
app.get('/recipes/search/general', rc.get_recipe_by_query_search) // search for a recipe
app.post('/recipes', rc.add_recipe) // add a recipe ✔️
app.put('/recipes/:id', rc.edit_recipe) // edit a recipe's ingredients
app.put('/recipes/upvote/:id', rc.upvote_recipe) // upvote a recipe ✔️
app.put('/recipes/remove/:id', rc.delete_recipe) // delete a recipe ✔️

// user routes
app.get('/users/:id', uc.get_user_by_id) // get user by id ✔️
app.get('/users', uc.get_user_by_username) // get user by username by appending `?user=<username>` ✔️
app.get('/users/favorites/recipes/:uid', uc.get_user_favorites) // get user favorites
app.put('/users/favorites/:id', uc.add_to_favorites) // add a recipe to user favorites
app.put('/users/favorites/remove/:id', uc.remove_from_favorites) // remove recipe from favorites

// meal plan routes
app.get('/plans/:id', pc.get_plan_list) // return a list of plan links
// save pdf to user account

app.get('/plans/pdf/:id', pc.get_plan) // return link to single plan using ?plan=<filename>
app.post('/plans/create/clean', pc.create_plan)

// forum routes
app.get('/forum/:id', fc.get_post) // get a specific post
app.get('/forum', fc.get_all_posts) // get all posts
app.post('/forum', fc.create_post) // create a new post
app.post('/forum/reply/:id', fc.add_reply) // add a reply to the post
app.put('/forum/:id', fc.update_post) // change the content of the post
app.delete('/forum/reply/:id', fc.delete_reply) // post id in params, reply id in body
app.delete('/forum/post/:id', fc.delete_post) // delete a post
app.put('/forum/reply/:id', fc.upvote_reply) // upvote a reply, postIDthrough params and reply id through body
app.get('/forum/user/:uid', fc.get_posts_by_user_id) // get posts by user id
app.get('/forum/search/general', fc.query_post)

// purely for development purposes
const init = () => {
	try {
		db.collection('recipes')
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					client.hmset('recipes', doc.data().id, JSON.stringify(doc.data()))
				})
			})
			.catch((err) => console.log(err))

		db.collection('users')
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					client.hmset('users', doc.data().id, JSON.stringify(doc.data()))
				})
			})
			.catch((err) => console.log(err))

		db.collection('forum')
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					client.hmset('forum', doc.data().id, JSON.stringify(doc.data()))
				})
			})
			.catch((err) => console.log(err))

		db.collection('plans')
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					client.hmset('plans', doc.data().id, JSON.stringify(doc.data()))
				})
			})
	} catch (err) {
		console.log(err)
	}
}

const port = 4000
app.listen(port, () => {
	console.log('\x1b[35m', '\t[ - ] does this even work redis cache....')
	init()
	console.log('\x1b[33m', `\t[ * ] Listening on localhost:${port}`)
})
