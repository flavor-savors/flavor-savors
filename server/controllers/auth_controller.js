module.exports = {
	get_current_user: (req, res) => {
		const admin = req.app.get('admin')

		let user = admin.auth().currentUser
		if (user) {
			res.status(200).json(user)
		} else {
			res.status(409).json('No user signed in')
		}
	},

	register_user: (req, res) => {
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
						favorites: [],
						recipes: [],
					})
					.then((ref) => ref.update({ id: ref.id }))
					.catch((err) => res.status(500).json(err))
				res.status(200).json(user)
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},

	login: (req, res) => {
		// I think this needs to be moved onto the frontend
		// login auth seems to not really need to touch the backend
	},
}
