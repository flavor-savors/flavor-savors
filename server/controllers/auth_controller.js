module.exports = {
	get_current_user: (req, res) => {
		const admin = req.app.get('admin')

		let user = admin.firebase.auth().currentUser
		if (user) {
			res.status(200).json(user)
		} else {
			res.status(409).json('No user signed in')
		}
	},

	register_user: (req, res) => {
		try {
			const admin = req.app.get('admin')
			const db = req.app.get('db')

			admin
				.auth()
				.createUser({
					email: req.body.email,
					password: req.body.password,
					displayName: req.body.displayName,
					photoURL: req.body.photoURL,
				})
				.then((user) => {
					db.collection('users')
						.add({
							username: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
							uid: user.uid,
							favorites: [],
							recipes: [],
						})
						.then((ref) => ref.update({ id: ref.id }))
						.catch((err) => res.status(500).json(err))
					console.log('User added to db')
					res.status(200).json(user)
				})
				.catch((err) => {
					res.status(500).json(err)
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// should I just delete the current users account? or have it be ID based then protected from the frontend?
	delete_user: (req, res) => {
		try {
			const admin = req.app.get('admin')
			const user = admin.firebase.auth().currentUser // not sure if this can be used in node, we'll have to wait

			console.log(user)
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
