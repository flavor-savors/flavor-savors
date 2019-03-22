module.exports = {
	get_user_by_id: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('users')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					if (snapshot.empty) {
						res.status(404).json('User not found')
					}

					res.status(200).json(snapshot.data())
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// for whatever reason params aren't working for this, so query it is for now
	get_user_by_username: (req, res) => {
		try {
			const db = req.app.get('db')

			db.collection('users')
				.where('username', '==', req.query.user)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						res.status(200).json(doc.data())
					})
				})
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	// good lord why did it have to come to this
	// theres probably a much much much much much better way to do this
	get_user_favorites: (req, res) => {
		try {
			const db = req.app.get('db')

			let recipes = []
			let docs = []

			db.collection('users')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					recipes = snapshot.data().favorites
				})
				.then(async () => {
					for (let i = 0; i < recipes.length; i++) {
						let x = await db
							.collection('recipes')
							.doc(recipes[i].id)
							.get()
							.then((snapshot) => {
								return snapshot.data()
							})
							.catch((err) => res.status(500).json(err))
						docs.push(x)
					}
				})
				.then(() => {
					res.json(docs)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.json(500).json(err)
		}
	},

	// need to figure out what image storage service to use for this
	update_profile: (req, res) => {
		// update user profile pictures, etc
	},

	// add a recipe id to a users favorites
	add_to_favorites: (req, res) => {
		// This method is way slower compared to old but sacrifices had
		// to be made so that the data is easier to pass in on the frontend

		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')

			db.collection('users')
				.where('uid', '==', req.body.uid)
				.get()
				.then((snapshot) => {
					let id
					snapshot.forEach((doc) => {
						id = doc.data().id
					})

					db.collection('users')
						.doc(id)
						.update({
							favorites: admin.firestore.FieldValue.arrayUnion(req.params.id),
						})
					res.status(200).json('Added to favorites')
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	remove_from_favorites: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')

			db.collection('users')
				.where('uid', '==', req.body.uid)
				.get()
				.then((snapshot) => {
					let id
					snapshot.forEach((doc) => {
						id = doc.data().id
					})

					db.collection('users')
						.doc(id)
						.update({
							favorites: admin.firestore.FieldValue.arrayUnion(req.params.id),
						})
					res.status(200).json('Added to favorites')
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
