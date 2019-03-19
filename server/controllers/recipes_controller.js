const moment = require('moment')
moment.locale()

module.exports = {
	get_all_recipes: (req, res) => {
		const db = req.app.get('db')
		let recipes = []

		db.collection('recipes')
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => recipes.push(doc.data()))
				res.status(200).json(recipes)
			})
			.catch((err) => res.status(500).json(err))
	},

	get_public_recipes: (req, res) => {
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
	},

	get_recipe_by_id: (req, res) => {
		const db = req.app.get('db')
		db.collection('recipes')
			.doc(req.params.id)
			.get()
			.then((snapshot) => {
				res.status(200).json(snapshot.data())
			})
	},

	get_recipe_by_user: (req, res) => {
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
	},

	get_recipe_by_query: (req, res) => {
		const db = req.app.get('db')
		let recipes = []

		db.collection('db')
			.where('ingredient', 'array-contains', req.query.search)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					res.status(404).json('No results found')
				}

				recipes = snapshot.forEach((doc) => recipes.push(doc.data()))
				res.status(200).json(recipes)
			})
	},

	add_recipe: (req, res) => {
		const db = req.app.get('db')

		let timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')

		// convert this to request objects when the front-end is built
		let data = {
			created: timestamp,
			id: '',
			edited: false,
			user: 'great',
			public: true,
			imageURL: 'nice',
			directions: 'it works',
			upvotes: 0,
			recipeName: 'test',
			dietTags: ['vegan', 'chinese', 'test'],
			ingredient: [
				{
					name: 'beef',
					amount: '1 tbsp',
				},
				{
					name: 'bologna',
					amount: '3 crumbs',
				},
			],
			addons: [
				{
					name: 'garbage',
					amount: '2 scoops',
				},
			],
		}

		db.collection('recipes')
			.add(data)
			.then((ref) => {
				ref
					.update({ id: ref.id })
					.then(() => res.json(data))
					.catch((err) => res.status(500).json(err))
			})
			.catch((err) => res.status(500).json(err))
	},

	// this will defintely need to be reworked once we see
	// the shape of the data coming in from the front-end
	edit_recipe: (req, res) => {
		const db = req.app.get('db')
		const admin = req.app.get('admin')
		let timestamp = moment()
			.subtract(10, 'days')
			.calendar()

		db.collection('recipes')
			.doc(req.params.id)
			.update({
				ingredient: admin.firestore.FieldValue.arrayUnion({
					name: req.body.name,
					amount: req.body.amount,
				}),
			})
	},

	delete_recipe: (req, res) => {
		const db = req.app.get('db')

		try {
			db.collection('recipes')
				.doc(req.params.id)
				.delete()

			res.status(200).json('Recipe deleted')
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
