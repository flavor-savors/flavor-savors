const util = require('./util_controller')
const pdf = require('pdfkit')
const moment = require('moment')
moment.locale() // set the locale

module.exports = {
	// I think I only need to export this method, the rest can be private functions
	create_pdf: (req, res) => {
		let doc = new pdf() // create new instance of pdfkit
		let filename = `${req.body.username}_${moment().format('MMM Do YY')}` // give it a filename
		filename = encodeURIComponent(filename) + '.pdf' // encode it

		// set the appropriate headers
		res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"')
		res.setHeader('Content-Type', 'application/pdf')

		let content = {
			groceryList: ['sand', 'borax', 'nyquil', 'garlic bread'],
			plan: ['monday: sand', 'tuesday: nyquil', 'wednesday: soap', 'thursday: garlic bread'],
		}

		doc.y = 300 // set the document sizing
		doc.text('Grocery List', {
			fontSize: 18,
			underline: true,
		})

		doc.list(content.groceryList, {
			width: 100,
			align: 'left',
		})

		doc.moveDown()
		doc.text('Plan', {
			fontSize: 18,
			underline: true,
		})

		doc.list(content.plan, {
			width: 300,
			align: 'left',
		}).textIndent

		doc.pipe(res) // send it back
		doc.end() // close the doc stream

		// save pdf to user object
	},

	upload_pdf: (req, res) => {
		// upload to either S3 or Firebase
		console.log(req.file)
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

	create_plan: (req, res) => {
		// create a plan from data sent in
		let data = {
			b1: [
				{
					recipe_name: 'breakfast 1:1',
					recipe_id: '1HEkEQy0uQdAwk5Bjwyc',
				},
				{
					recipe_name: 'breakfast 1:2',
					recipe_id: 'Ah2FXI3J4pcOiE6n4Azk',
				},
			],

			l1: [
				{
					recipe_name: 'lunch 1:1',
					recipe_id: 'GEJrw7bCItHrGfixnprI',
				},
				{
					recipe_name: '1:1',
					recipe_id: 'Ff27RjuRznn8oOfdZNkj',
				},
			],
			d1: [
				{
					recipe_name: 'lunch 1:1',
					recipe_id: 'TWO2X0yN4MNQLOWOaax1',
				},
				{
					recipe_name: '1:1',
					recipe_id: 'QiKYeu9TeMjCEXr0uVk5',
				},
			],
			b2: [
				{
					recipe_name: 'breakfast 1:1',
					recipe_id: 'VzQylZYChqoct9bPPz0I',
				},
				{
					recipe_name: 'breakfast 1:2',
					recipe_id: 'UFsC7tKAmkLJrDHGgtEh',
				},
			],

			l2: [
				{
					recipe_name: 'lunch 1:1',
					recipe_id: 'T5Nim15X8YAbpx6TEhsq',
				},
				{
					recipe_name: '1:1',
					recipe_id: 'KhEHHJYt6XdBGEYlxV7B',
				},
			],
			d2: [
				{
					recipe_name: 'lunch 1:1',
					recipe_id: 'Ejm3xq7ZgGKzt7dOzite',
				},
				{
					recipe_name: '1:1',
					recipe_id: 'cycTeze2NhVRlehuX9zZ',
				},
			],
		}

		// slow (130ms on avg) but it works
		const client = req.app.get('client')

		let recipes = []
		let ids = []
		let all_recipes = []
		let filtered = []

		for (let key in data) {
			recipes.push(data[key])
		}

		recipes.map((recipe) => {
			recipe.forEach((rec) => ids.push(rec.recipe_id))
		})

		client.hgetall('recipes', (err, result) => {
			if (err) {
				console.log(err)
				res.status(500).json(err)
			}

			for (let key in result) {
				all_recipes.push(JSON.parse(result[key]))
			}

			for (let i = 0; i < all_recipes.length; i++) {
				for (let j = 0; j < ids.length; j++) {
					if (all_recipes[i].id == ids[j]) {
						let code = ''
						for (let key in data) {
							for (let i = 0; i < data[key].length; i++) {
								if (data[key][i].recipe_id === ids[j]) {
									code = key
									console.log(
										`key: ${key} | ids[j]: ${ids[j]} | recipe_id: ${data[key][i].recipe_id}`
									)
									break
								}
							}
						}
						filtered.push({
							meal: code,
							...all_recipes[i],
						})
					}
				}
			}

			res.json(filtered)
		})
	},


	switch(recipe.meal) {
		case 'b1':
			do this
		case 'b2':
			do this
		
	}
}
