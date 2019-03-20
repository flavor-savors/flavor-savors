module.exports = {
	create_pdf: (req, res, data) => {
		// generate a pdf using data object passed in
	},

	// might only need to export this one
	clean_data: (req, res) => {
		// format the data before it's sent to the generator
	},

	upload_pdf: (req, res) => {
		// upload to either S3 or Firebase
		console.log(req.file)

		// try {
		// 	const admin = req.app.get('admin')
        //     const storage = admin.storage().bucket()
        //     const file = storage.file(req.file.originalname)

        //     storage.upload(file).then()
		// } catch (err) {
		// 	console.log(err)
		// 	res.status(500).json(err)
		// }
	},

	save_pdf_to_user: (req, res) => {
		// save PDF location to user account
	},

	get_plan_list: (req, res) => {
		try {
			const db = req.app.get('db')

			db.collection('users')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					res.status(200).json(snapshot.data().plans)
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},

	get_plan: (req, res) => {
		try {
			const db = req.app.get('db')

			db.collection('users')
				.doc(req.params.id)
				.get()
				.then((snapshot) => {
					let plan = snapshot.data().plans.filter((file) => file === req.query.plan)
					if (plan.length > 0) {
						res.status(200).json(plan[0])
					}
				})
				.catch((err) => res.status(500).json(err))
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
