const moment = require('moment')
moment.locale()

module.exports = {
	get_all_recipes: (req, res) => {
		try {
			const db = req.app.get('db')
			let recipes = []

			db.collection('recipes')
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => recipes.push(doc.data()))
					res.status(200).json(recipes)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_public_recipes: (req, res) => {
		try {
			const db = req.app.get('db')
			let recipes = []

			db.collection('recipes')
				.where('public', '==', true)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => recipes.push(doc.data()))
					res.status(200).json(recipes)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_recipe_by_id: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('recipes')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					res.status(200).json(snapshot.data())
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_recipe_by_user: (req, res) => {
		try {
			const db = req.app.get('db')
			let recipes = []

			db.collection('recipes')
				.where('user', '==', req.params.user)
				.get()
				.then((snapshot) => {
					if (snapshot.empty) {
						res.status(404).json('User has no recipes')
					} else {
						snapshot.forEach((doc) => recipes.push(doc.data()))
						res.status(200).json(recipes)
					}
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// array-contains apparently doesn't work when it's an array of maps, so filter will have to do for now
	get_recipe_by_query: (req, res) => {
		try {
			const db = req.app.get('db')
			let recipes = []

			db.collection('db')
				.get()
				.then((snapshot) => {
					if (snapshot.empty) {
						res.status(404).json('No results found')
					}

					recipes = snapshot.forEach((doc) => recipes.push(doc.data()))
					res.status(200).json(recipes.filter((recipe) => recipe.name === req.query.q))
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
			user: req.body.user, // should be pulled from the current user and sent in
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
			db.collection('recipes')
				.add(data)
				.then((ref) => {
					refid = ref.id
					ref
						.update({ id: ref.id })
						.then(() => res.json(data))
						.catch((err) => res.status(500).json(err))
				})
				.catch((err) => res.status(500).json(err))
			// need to get the current user's id and add the recipe to their recipes
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	// this will defintely need to be reworked once we see
	// the shape of the data coming in from the front-end
	edit_recipe: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')

			db.collection('recipes')
				.doc(req.params.id)
				.update({
					ingredient: admin.firestore.FieldValue.arrayUnion({
						name: req.body.name,
						amount: req.body.amount,
					}),
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	delete_recipe: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('recipes')
				.doc(req.params.id)
				.delete()

			res.status(200).json('Recipe deleted')
		} catch (err) {
			res.status(500).json(err)
		}
	},

	upvote_recipe: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')

			db.collection('recipes')
				.doc(req.params.id)
				.update({
					upvotes: admin.firestore.FieldValue.increment(1),
				})
				.then(() => {
					db.collection('recipes')
						.doc(req.params.id)
						.get()
						.then((snapshot) => res.status(200).json(snapshot.data()))
				})
				.catch((err) => {
					console.log(err)
					res.status(500).json(err)
				})
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},
}
