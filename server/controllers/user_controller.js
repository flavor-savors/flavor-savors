module.exports = {
	get_user_by_id: (req, res) => {
		try {
			// const db = req.app.get('db')
			// db.collection('users')
			// 	.doc(req.params.id)
			// 	.get()
			// 	.then((snapshot) => {
			// 		if (snapshot.empty) {
			// 			res.status(404).json('User not found')
			// 		}

			// 		res.status(200).json(snapshot.data())
			// 	})

			// this should probably be converted to use the user's uid
			const client = req.app.get('client')
			client.hmget('users', req.params.id, (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				res.status(200).json(JSON.parse(result))
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// for whatever reason params aren't working for this, so query it is for now
	get_user_by_username: (req, res) => {
		try {
			// const db = req.app.get('db')

			// db.collection('users')
			// 	.where('username', '==', req.query.user)
			// 	.get()
			// 	.then((snapshot) => {
			// 		snapshot.forEach((doc) => {
			// 			res.status(200).json(doc.data())
			// 		})
			// 	})

			const client = req.app.get('client')
			let all_users = []

			client.hgetall('users', (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				for (let key in result) {
					all_users.push(JSON.parse(result[key]))
				}

				if (all_users.length < 1) {
					res.status(500).json('Something went wrong')
				} else {
					res.status(200).json(all_users.filter((user) => user.username === req.query.user))
				}
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
							recipes = snapshot.data().favorites
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
										console.log('error on 71', err)
										res.status(500).json(err)
									})
								docs.push(x)
							}
						})
						.then(() => {
							res.json(docs)
						})
						.catch((err) => {
							console.log('error on 81', err)
							res.status(500).json(err)
						})
				})

			// I'll come back to this

			// const client = req.app.get('client')
			// let all_users = []
			// let user_recipes = []

			// client.hgetall('users', (err, result) => {
			// 	if (err) {
			// 		console.log(err)
			// 	}

			// 	for (let key in result) {
			// 		all_users.push(JSON.parse(result[key]))
			// 	}

			// 	user_recipes = all_users.filter((user) => {
			// 		if (user.uid === req.params.uid) {
			// 			if (user.favorites.length > 0) {
			// 				return user.favorites
			// 			}
			// 		}
			// 	})

			// 	client.hgetall('recipes', (err, result) => {
			// 		if (err) {
			// 			console.log(err)
			// 			res.status(500).json(err)
			// 		}

			// 		let all_recipes = []
			// 		for (let key in result) {
			// 			all_recipes.push(JSON.parse(result[key]))
			// 		}

			// 		let response = all_recipes.filter((recipe) => {
			// 			user_recipes.filter((match, index) => {
			// 				console.log('index', index)
			// 				if (recipe.id === match.favorites[index]) {
			// 					console.log(recipe)
			// 					return recipe
			// 				}
			// 			})
			// 		})

			// 		res.json(response)
			// 	})
			// })
		} catch (err) {
			console.log('error in catch block', err)
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
			// const db = req.app.get('db')
			// const admin = req.app.get('admin')

			// db.collection('users')
			// 	.where('uid', '==', req.body.uid)
			// 	.get()
			// 	.then((snapshot) => {
			// 		let id
			// 		snapshot.forEach((doc) => {
			// 			id = doc.data().id
			// 		})

			// 		db.collection('users')
			// 			.doc(id)
			// 			.update({
			// 				favorites: admin.firestore.FieldValue.arrayUnion(req.params.id),
			// 			})
			// 		res.status(200).json('Added to favorites')
			// 	})
			// 	.catch((err) => res.status(500).json(err))

			// const client = req.app.get('client')
			// const db = req.app.get('db')
			// client.hgetall('users', (err, result) => {
			// 	if (err) {
			// 		console.log(err)
			// 		res.status(500).json(err)
			// 	}

			// 	let all_users = []

			// 	for (let key in result) {
			// 		all_users.push(JSON.parse(result[key]))
			// 	}

			// 	let user = all_users.filter((user) => user.uid === req.body.uid)
			// 	if (user !== [] || !user) {
			// 		let index = user[0].favorites.findIndex((id) => id === req.params.id)
			// 		if (index === -1) {
			// 			res.status(404).json('Recipe not found in favorites')
			// 		} else {
			// 			user[0].favorites.splice(index, 1)
			// 			res.status(200).json(user[0])

			// 			db.collection('users')
			// 				.doc(user[0].id)
			// 				.set(user[0])
			// 		}
			// 	} else {
			// 		res.status(404).json('User not found')
			// 	}
			// })

			// const db = req.app.get('db')
			// const client = req.app.get('client')

			// let all_users = []

			// console.log('req.body.uid: ', req.body.uid)
			// console.log('req.params.id: ', req.params.id)

			// client.hgetall('users', (err, result) => {
			// 	if (err) {
			// 		console.log(err)
			// 		res.status(500).json(err)
			// 	}

			// 	for (let key in result) {
			// 		all_users.push(JSON.parse(result[key]))
			// 	}

			// 	let user = all_users.filter((user) => user.uid === req.body.uid)
			// 	if (user) {
			// 		console.log(user)
			// 		user[0].favorites.splice(user[0].favorites.indexOf(req.params.id), 1)

			// 		db.collection('users')
			// 			.doc(user[0].id)
			// 			.set(user[0])
			// 	} else {
			// 		res.status(404).json('user not found')
			// 	}
			// })

			res.status(200).json('Recipe deleted')
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
