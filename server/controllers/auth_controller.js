module.exports = {
	register_user: (req, res) => {
		try {
			const admin = req.app.get('admin')
			const db = req.app.get('db')

			console.log('req.body:', req.body)

			admin
				.auth()
				.createUser({
					email: req.body.email,
					password: req.body.password,
					displayName: req.body.displayName,
					photoURL: req.body.photoURL || 'https://via.placeholder.com/150',
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
							plans: [],
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

			console.log(user)
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
