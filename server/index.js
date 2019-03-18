const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase.json')
const rc = require('./controllers/recipes_controller')
const ac = require('./controllers/auth_controller')
const app = express()

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://flavor-savor.firebaseio.com',
})

const db = admin.firestore()
app.set('db', db) // set the db so that it's accessible outside of this file
app.set('admin', admin)

// middleware
app.use(json())
app.use(cors())

// TODO:
//      + Fix search, may need to change structure of ingredients array
//      + Token verification
//      + Port login and register to the frontend
//      + Verify auth system works

// auth routes
app.get('/user/current', ac.get_current_user) // see if a user is signed in
app.post('/register', ac.register_user) // Sign a user up

// recipe routes
app.get('/recipes/all', rc.get_all_recipes) // get all recipes
app.get('/recipes', rc.get_public_recipes) // get all public recipes
app.get('/recipes/:user', rc.get_recipe_by_user) // get recipes for a user
app.get('/recipes', rc.get_recipe_by_query) // search for a recipe
app.post('/recipes', rc.add_recipe) // add a recipe
app.put('/recipe/:id', rc.edit_recipe) // edit a recipe's ingredients
app.delete('/recipes/:id', rc.delete_recipe) // delete a recipe

// user routes
// these should be protected via the frontend

// meal plan routes

// forum routes

const port = 4000
app.listen(port, () => console.log(`Listening on localhost:${port}`))
