const moment = require('moment')
const uuid = require('short-uuid')

module.exports = {
	create_post: (req, res) => {
		// obviously we'll have to convert this to getting data off of the request object
		// once we get the frontend built out
		let data = {
			id: '',
			content: req.body.content,
			created: moment().format('MMMM Do YYYY, h:mm:ss a'),
			edited: false,
			uid: req.body.uid,
			username: req.body.username,
			replies: []
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
						id: uuid.generate(),
						content: req.body.content,
						created: moment().format('MMMM Do YYYY, h:mm:ss a'),
						upvotes: 0,
						uid: req.body.uid,
						username: req.body.username
					}),
				})
			res.status(200).json('Reply added')
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	// FieldValue.arrayRemove is weird, gonna wait a bit
	delete_reply: (req, res) => {
		try {
			const db = req.app.get('db')
			const admin = req.app.get('admin')
			const client = req.app.get('client')

			// get post id
			// get reply id
			// delete from cache
			// update cache
			// update db

			client.hmget('forum', req.params.id, (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				let parsed = JSON.parse(result)
				let replyIndex = parsed.replies.findIndex((rep) => rep.id === req.body.id)
				if (replyIndex === -1) {
					res.status(404).json('Reply not found')
				}

				parsed.replies.splice(replyIndex, 1)

				res.status(200).json(parsed)

				db.collection('forum')
					.doc(req.params.id)
					.set(parsed)

				client.hmset('forum', req.params.id, JSON.stringify(parsed))
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},

	upvote_reply: (req, res) => {
		// get post id
		// get reply id
		// increment fieldvalue

		try {
			const db = req.app.get('db')
			let replies

			db.collection('forum')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					replies = snapshot.data().replies
					replies.forEach((reply, index) => {
						if (reply.id === req.body.id) {
							replies[index].upvotes++
						}
					})

					db.collection('forum')
						.doc(req.params.id)
						.update({
							replies: replies,
						})
						.then(() => res.json('updated'))
				})
				.catch((err) => {
					console.log(err)
					res.status(500).json(err)
				})

			// come back to this
			// const db = req.app.get('db')
			// const client = req.app.get('client')
			// let parsed

			// client.hmget('forum', req.params.id, (err, result) => {
			// 	if (err) {
			// 		console.log(err)
			// 		res.status(500).json(err)
			// 	}

			// 	parsed = JSON.parse(result)
			// 	parsed.replies.map((reply) => {
			// 		if (reply.id === req.body.userID) {
			// 			reply.upvotes++
			// 		}
			// 	})

			// 	console.log(parsed.replies)

			// 	client.hmset('forum', parsed.id, JSON.stringify(parsed))
			// 	res.json(parsed)

			// 	db.collection('forum')
			// 		.doc(req.params.id)
			// 		.set(parsed)
			// 		.catch((err) => console.log(err))
			// })
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	},

	get_posts_by_user_id: (req, res) => {
		// do it
		try {
			const client = req.app.get('client')
			let all_posts = []

			client.hgetall('forum', (err, result) => {
				if (err) {
					console.log(err)
					res.status(500).json(err)
				}

				for (let key in result) {
					all_posts.push(JSON.parse(result[key]))
				}

				res.json(all_posts.filter((post) => post.uid === req.params.uid))
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
