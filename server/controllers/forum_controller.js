const moment = require('moment')

module.exports = {
	create_post: (req, res) => {
		// obviously we'll have to convert this to getting data off of the request object
		// once we get the frontend built out
		let data = {
			id: '',
			content: 'how to making the butter',
			created: moment().format('MMMM Do YYYY, h:mm:ss a'),
			edited: false,
			replies: [
				{
					content: 'nice. me too thanks',
					created: moment().format('MMMM Do YYYY, h:mm:ss a'),
					upvotes: 0,
					user: 'garth',
				},
			],
		}

		try {
			const db = req.app.get('db')
			db.collection('forum')
				.add(data)
				.then((ref) => {
					ref.update({ id: ref.id }).then(() =>
						res.status(200).json({
							...data,
							id: ref.id,
						})
					)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	delete_post: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('forum')
				.doc(req.params.id)
				.delete()
			res.status(200).json('Post deleted')
		} catch (err) {
			res.status(500).json(err)
		}
	},

	update_post: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('forum')
				.doc(req.params.id)
				.update({
					edited: true,
					content: req.body.content,
				})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_post: (req, res) => {
		try {
			const db = req.app.get('db')
			db.collection('forum')
				.doc(req.params.id)
				.get()
				.then((snapshot) => res.status(200).json(snapshot.data()))
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_all_posts: (req, res) => {
		try {
			const db = req.app.get('db')
			let posts = []
			db.collection('forum')
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => posts.push(doc.data()))
					res.status(200).json(posts)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	add_reply: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')
			db.collection('forum')
				.doc(req.params.id)
				.update({
					replies: admin.firestore.FieldValue.arrayUnion({
						content: req.body.content,
						created: moment().format('MMMM Do YYYY, h:mm:ss a'),
						upvotes: 0,
						user: req.body.user,
					}),
				})
			res.status(200).json('Reply added')
		} catch (err) {
			res.status(500).json(err)
		}
	},

	// FieldValue.arrayRemove is weird, gonna wait a bit
	delete_reply: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
