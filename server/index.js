require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json') // move to env
const rc = require('./controllers/recipes_controller')
const ac = require('./controllers/auth_controller')
const uc = require('./controllers/user_controller')
const fc = require('./controllers/forum_controller')
const pc = require('./controllers/plan_controller')
const app = express()
const upload = multer() // give us access to req.file

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://flavor-savor.firebaseio.com', // move to env
	storageBucket: 'gs://flavor-savor.appspot.com/',
})

const db = admin.firestore()
app.set('db', db) // set the db so that it's accessible outside of this file
app.set('admin', admin)

// middleware
app.use(json())
app.use(cors())

//
//  TODO:
//      + When a user creates a recipe it should go into their recipes array
//      + Create plan schema or find a place for it
//		+ Multi-tag filter search
//		+ Redis or Memcached to cache recipes and make calls faster?
//		+ Measure the speed of all functions
//		+ Work out hypothetical Redis flow
//		+ Mess with user data
//		+ Fix routes that require user's UUID:
//			- get_recipes_by_user
//			- add_recipe (should add the recipe ID to the correct user document)
//			- get_user_favorites (should use the uuid to get the user document id)
//			- add_to_favorites
//			- remove_from_favorites
//

// auth routes
app.get('/user/current', ac.get_current_user) // see if a user is signed in
app.post('/register', ac.register_user) // Sign a user up

// recipe routes
app.get('/recipes/all', rc.get_all_recipes) // get all recipes
app.get('/recipes', rc.get_public_recipes) // get all public recipes
app.get('/recipes/:id', rc.get_recipe_by_id) // get recipe by id
app.get('/recipes/:user', rc.get_recipe_by_user) // get recipes for a user
app.get('/recipes', rc.get_recipe_by_query) // search for a recipe
app.post('/recipes', rc.add_recipe) // add a recipe
app.put('/recipes/:id', rc.edit_recipe) // edit a recipe's ingredients
app.put('/recipes/upvote/:id', rc.upvote_recipe) // upvote a recipe
app.delete('/recipes/:id', rc.delete_recipe) // delete a recipe

// user routes
app.get('/users/:id', uc.get_user_by_id) // get user by id
app.get('/users', uc.get_user_by_username) // get user by username by appending `?user=<username>`
app.get('/users/favorites/:id', uc.get_user_favorites) // get user favorites
app.put('/users/favorites/:id', uc.add_to_favorites) // add a recipe to user favorites
app.delete('/users/favorites/:id', uc.remove_from_favorites) // remove recipe from favorites

// meal plan routes
app.get('/plans/pdf', pc.create_pdf)
// add plan to db *
// save pdf to user account
app.get('/plans/:id', pc.get_plan_list) // return a list of plan links
app.get('/plans/pdf/:id', pc.get_plan) // return link to single plan using ?plan=<filename>
app.post('/upload', upload.single('file'), pc.upload_pdf)

// forum routes
app.get('/forum/:id', fc.get_post) // get a specific post
app.get('/forum', fc.get_all_posts) // get all posts
app.post('/forum', fc.create_post) // create a new post
app.post('/forum/reply/:id', fc.add_reply) // add a reply to the post
app.put('/forum/:id', fc.update_post) // change the content of the post
app.delete('/forum/:id', fc.delete_post) // delete a post
app.put('/forum/reply/:id', fc.upvote_reply) // upvote a reply, send postID in through params and reply id through body

const port = 4000
app.listen(port, () => console.log(`Listening on localhost:${port}`))