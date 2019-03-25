const moment = require('moment')
moment.locale()

module.exports = {
	get_all_recipes: (req, res) => {
		try {
			// const db = req.app.get('db')
			// let recipes = []

			// db.collection('recipes')
			// 	.get()
			// 	.then((snapshot) => {
			// 		snapshot.forEach((doc) => recipes.push(doc.data()))
			// 		res.status(200).json(recipes)
			// 	})
			// 	.catch((err) => res.status(500).json(err))

			const client = req.app.get('client')
			let all_recipes = []

			client.hgetall('recipes', (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				for (let key in result) {
					all_recipes.push(JSON.parse(result[key]))
				}

				res.status(200).json(all_recipes)
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_public_recipes: (req, res) => {
		try {
			// const db = req.app.get('db')
			// let recipes = []

			// db.collection('recipes')
			// 	.where('public', '==', true)
			// 	.get()
			// 	.then((snapshot) => {
			// 		snapshot.forEach((doc) => recipes.push(doc.data()))
			// 		res.status(200).json(recipes)
			// 	})
			// 	.catch((err) => res.status(500).json(err))

			const client = req.app.get('client')
			let recipes = []

			client.hgetall('recipes', (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				for (let key in result) {
					recipes.push(JSON.parse(result[key]))
				}

				res.status(200).json(recipes.filter((recipe) => recipe.public === true))
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_recipe_by_id: (req, res) => {
		try {
			// const db = req.app.get('db')
			// db.collection('recipes')
			// 	.doc(req.params.id)
			// 	.get()
			// 	.then((snapshot) => {
			// 		res.status(200).json(snapshot.data())
			// 	})
			const client = req.app.get('client')
			const db = req.app.get('db')
			client.hmget('recipes', req.params.id, (err, results) => {
				if (err) {
					console.log(err)
					throw err
				}

				// if the recipe isn't found, get it from the db and write it to the cache
				if (results[0] === null) {
					db.collection('recipes')
						.doc(req.params.id)
						.get()
						.then((snapshot) => {
							if (snapshot.empty) {
								res.status(404).json('Recipe not found')
							}

							console.log('snapshot.data()', snapshot.data())
							client.hmset('recipes', req.params.id, JSON.stringify(snapshot.data()))
							res.status(200).json(snapshot.data())
						})
				} else {
					res.status(200).json(results)
				}
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// gonna stick with db calls for now due to time restraints
	get_recipe_by_user: (req, res) => {
		try {
			const db = req.app.get('db')

			let recipes = []
			let docs = []
			let id = ''

			db.collection('users')
				.where('uid', '==', req.params.uid)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => (id = doc.data().id))
					// console.log(id)
					db.collection('users')
						.doc(id)
						.get()
						.then((snapshot) => {
							recipes = snapshot.data().recipes
						})
						.then(async () => {
							for (let i = 0; i < recipes.length; i++) {
								console.log('recipeid', recipes)
								let x = await db
									.collection('recipes')
									.doc(recipes[i])
									.get()
									.then((snapshot) => {
										return snapshot.data()
									})
									.catch((err) => {
										console.log(err)
										res.status(500).json(err)
									})
								docs.push(x)
							}
						})
						.then(() => {
							res.json(docs)
						})
						.catch((err) => {
							console.log(err)
							res.status(500).json(err)
						})
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// array-contains apparently doesn't work when it's an array of maps, so filter will have to do for now
	get_recipe_by_query_search: (req, res) => {
		try {
			// const db = req.app.get('db')
			// let recipes = []

			// db.collection('db')
			// 	.get()
			// 	.then((snapshot) => {
			// 		if (snapshot.empty) {
			// 			res.status(404).json('No results found')
			// 		}

			// 		recipes = snapshot.forEach((doc) => recipes.push(doc.data()))
			// 		res.status(200).json(recipes.filter((recipe) => recipe.name === req.query.q))
			// 	})

			// search through recipe names and ingredients
			const client = req.app.get('client')
			let all_recipes = []

			console.log(req.query.q)
			client.hgetall('recipes', (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				for (let key in result) {
					console.log('key ::', key)
					console.log()
					all_recipes.push(JSON.parse(result[key]))
				}
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	add_recipe: (req, res) => {
		let data = {
			created: moment().format('MMMM Do YYYY, h:mm:ss a'),
			id: '',
			edited: false,
			user: req.body.uid, // should be pulled from the current user and sent in
			public: true,
			imageURL: req.body.imageURL,
			directions: req.body.directions,
			upvotes: 0,
			recipeName: req.body.recipeName,
			dietTags: req.body.dietTags,
			ingredient: req.body.ingredient,
		}

		try {
			let refid
			const db = req.app.get('db')
			const admin = req.app.get('admin')
			const client = req.app.get('client')
			db.collection('recipes')
				.add(data)
				.then((ref) => {
					refid = ref.id
					ref
						.update({ id: ref.id })
						.then(() => res.json(data))
						.catch((err) => res.status(500).json(err))

					let userdoc
					db.collection('users')
						.where('uid', '==', req.body.user)
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								userdoc = doc.id
							})

							console.log('userdoc:: ', userdoc)
							console.log('refid:: ', refid)

							db.collection('users')
								.doc(userdoc)
								.update({
									recipes: admin.firestore.FieldValue.arrayUnion(refid),
								})
						})
				})
				.catch((err) => res.status(500).json(err))

			// update the cache
			// middleware maybe?
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	// this will definitely need to be reworked once we see
	// the shape of the data coming in from the front-end
	edit_recipe: (req, res) => {
		let data = {
			created: moment().format('MMMM Do YYYY, h:mm:ss a'),
			id: req.params.id,
			edited: false,
			user: req.body.uid, // should be pulled from the current user and sent in
			public: true,
			imageURL: req.body.imageURL,
			directions: req.body.directions,
			upvotes: 0,
			recipeName: req.body.recipeName,
			dietTags: req.body.dietTags,
			ingredient: req.body.ingredient,
		}

		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')

			db.collection('recipes')
				.doc(req.params.id)
				.set(data)
		} catch (err) {
			res.status(500).json(err)
		}
	},

	delete_recipe: (req, res) => {
		try {
			const db = req.app.get('db')
			const client = req.app.get('client')

			db.collection('recipes')
				.doc(req.params.id)
				.delete()

			client.hdel('recipes', req.params.id)

			res.status(200).json('Recipe deleted')
		} catch (err) {
			res.status(500).json(err)
		}
	},

	upvote_recipe: (req, res) => {
		try {
			const db = req.app.get('db')
			const client = req.app.get('client')

			// db.collection('recipes')
			// 	.doc(req.params.id)
			// 	.update({
			// 		upvotes: admin.firestore.FieldValue.increment(1),
			// 	})
			// 	.then(() => {
			// 		db.collection('recipes')
			// 			.doc(req.params.id)
			// 			.get()
			// 			.then((snapshot) => res.status(200).json(snapshot.data()))
			// 	})
			// 	.catch((err) => {
			// 		console.log(err)
			// 		res.status(500).json(err)
			// 	})

			let parsed
			client.hmget('recipes', req.params.id, (err, result) => {
				if (err) {
					console.log(err)
					throw err
				}

				parsed = JSON.parse(result)
				console.log(parsed)
				parsed.upvotes++
				res.json(parsed)

				// why isnt the middleware updating this?
				client.hmset('recipes', req.params.id, JSON.stringify(parsed))

				db.collection('recipes')
					.doc(req.params.id)
					.set({ parsed })
					.catch((err) => console.log(err))
			})
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},
}
