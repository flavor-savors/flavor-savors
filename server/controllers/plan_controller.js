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

	get_ingredients: (req, res) => {
		// return a list of ingredients, like a grocery list
		// loop through object
		// get recipe id
		// for each one get the recipe ingredients
		// store it in an array
		// return it
	},

	create_plan: (req, res) => {
		// create a plan from data sent in
	},
}

//      GROCERY LIST STRUCTURE
// {
//     b1: [
//        {
//              recipe_name: '',
//              recipe_id: ''
//        },
//        {
//              recipe_name: '',
//              recipe_id: ''
//         }
//     ]
// }
