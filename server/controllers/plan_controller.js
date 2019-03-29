const util = require('./util_controller')
const moment = require('moment')
moment.locale() // set the locale

module.exports = {
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
		let data = req.body.plan
		// slow (130ms on avg) but it works
		const client = req.app.get('client')

		let recipes = []
		let fixed = []
		let all_recipes = []
		let full_plan = []

		for (let key in data) {
			recipes.push(data[key])
		}

		for (let i = 0; i < recipes.length; i++) {
			for (let j = 0; j < recipes[i].length; j++) {
				if (recipes[i] !== []) {
					fixed.push({
						id: recipes[i][j].id,						code: recipes[i][j].code,
					})
				}
			}
		}

		client.hgetall('recipes', (err, result) => {
			if (err) {
				console.error(err)
				res.status(500).json(err)
			}

			for (let key in result) {
				all_recipes.push(JSON.parse(result[key]))
			}

			for (let i = 0; i < all_recipes.length; i++) {
				for (let j = 0; j < fixed.length; j++) {
					if (all_recipes[i].id === fixed[j].id) {
						full_plan.push({
							code: fixed[j].code,
							recipe: all_recipes[i],
							ingredients: all_recipes[i].ingredient,
						})
					}
				}
			}
			res.json(full_plan)
		})

		// recipes.map((recipe) => {
		// 	recipe.forEach((rec) => ids.push(rec.id))
		// })

		// client.hgetall('recipes', (err, result) => {
		// 	if (err) {
		// 		console.log(err)
		// 		res.status(500).json(err)
		// 	}

		// 	for (let key in result) {
		// 		if (result[key] !== []) {
		// 			all_recipes.push(JSON.parse(result[key]))
		// 		}
		// 	}

		// 	// ERROR: if same recipes is chosen two days in a row all recipes get the same meal code
		// 	for (let i = 0; i < all_recipes.length; i++) {
		// 		for (let j = 0; j < ids.length; j++) {
		// 			if (all_recipes[i].id == ids[j]) {
		// 				let code = ''
		// 				for (let key in data) {
		// 					for (let i = 0; i < data[key].length; i++) {
		// 						if (data[key][i].id === ids[j]) {
		// 							code = key
		// 							console.log(`key: ${key} | ids[j]: ${ids[j]} | recipe_id: ${data[key][i].id}`)
		// 							break
		// 						}
		// 					}
		// 				}
		// 				filtered.push({
		// 					meal: code,
		// 					...all_recipes[i],
		// 				})
		// 			}
		// 		}
		// 	}

		// 	// console.log(filtered)
		// 	res.json(filtered)
		// })
	},
}

// TEST DATA
// let data = {
// 	b1: [
// 		{
// 			recipe_name: 'breakfast 1:1',
// 			recipe_id: '1HEkEQy0uQdAwk5Bjwyc',
//			code: "b1"
// 		},
// 		{
// 			recipe_name: 'breakfast 1:2',
// 			recipe_id: 'Ah2FXI3J4pcOiE6n4Azk',
// 		},
// 	],
//
// 	l1: [
// 		{
// 			recipe_name: 'lunch 1:1',
// 			recipe_id: 'GEJrw7bCItHrGfixnprI',
// 		},
// 		{
// 			recipe_name: '1:1',
// 			recipe_id: 'Ff27RjuRznn8oOfdZNkj',
// 		},
// 	],
// 	d1: [
// 		{
// 			recipe_name: 'lunch 1:1',
// 			recipe_id: 'TWO2X0yN4MNQLOWOaax1',
// 		},
// 		{
// 			recipe_name: '1:1',
// 			recipe_id: 'QiKYeu9TeMjCEXr0uVk5',
// 		},
// 	],
// 	b2: [
// 		{
// 			recipe_name: 'breakfast 1:1',
// 			recipe_id: 'VzQylZYChqoct9bPPz0I',
// 		},
// 		{
// 			recipe_name: 'breakfast 1:2',
// 			recipe_id: 'UFsC7tKAmkLJrDHGgtEh',
// 		},
// 	],

// 	l2: [
// 		{
// 			recipe_name: 'lunch 1:1',
// 			recipe_id: 'T5Nim15X8YAbpx6TEhsq',
// 		},
// 		{
// 			recipe_name: '1:1',
// 			recipe_id: 'KhEHHJYt6XdBGEYlxV7B',
// 		},
// 	],
// 	d2: [
// 		{
// 			recipe_name: 'lunch 1:1',
// 			recipe_id: 'Ejm3xq7ZgGKzt7dOzite',
// 		},
// 		{
// 			recipe_name: '1:1',
// 			recipe_id: 'cycTeze2NhVRlehuX9zZ',
// 		},
// 	],
// }
