import React, { Component } from 'react'

// const data = [
// 	{
// 		meal: 'b2',
// 		dietTags: [],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				amount: '1',
// 				name: 'green cabbage',
// 			},
// 			{
// 				name: 'red bell pepper',
// 				amount: '1',
// 			},
// 			{
// 				name: 'carrot',
// 				amount: '1',
// 			},
// 			{
// 				name: 'mayo',
// 				amount: '1/2 C.',
// 			},
// 			{
// 				name: 'apple cider vinegar',
// 				amount: '1/4 C.',
// 			},
// 			{
// 				name: 'agave nectar',
// 				amount: '2 Tbs.',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'VzQylZYChqoct9bPPz0I',
// 		edited: false,
// 		directions: '',
// 		imageURL:
// 			'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2015/07/2b74eac21cbb141925bdee577ff0c646587e33f2.jpeg',
// 		created: 'March 25th 2019, 9:27:33 am',
// 		recipeName: 'Cole Slaw',
// 	},
// 	{
// 		meal: 'b1',
// 		id: '1HEkEQy0uQdAwk5Bjwyc',
// 		edited: false,
// 		directions: '',
// 		imageURL:
// 			'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2015/07/2b74eac21cbb141925bdee577ff0c646587e33f2.jpeg',
// 		created: 'March 25th 2019, 9:27:32 am',
// 		recipeName: 'Cole Slaw',
// 		dietTags: [],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'green cabbage',
// 				amount: '1',
// 			},
// 			{
// 				name: 'red bell pepper',
// 				amount: '1',
// 			},
// 			{
// 				name: 'carrot',
// 				amount: '1',
// 			},
// 			{
// 				name: 'mayo',
// 				amount: '1/2 C.',
// 			},
// 			{
// 				name: 'apple cider vinegar',
// 				amount: '1/4 C.',
// 			},
// 			{
// 				name: 'agave nectar',
// 				amount: '2 Tbs.',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 		],
// 		upvotes: 0,
// 	},
// 	{
// 		meal: 'd2',
// 		edited: false,
// 		directions: 'eat them',
// 		imageURL:
// 			'data:image/jpeg;base64,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',
// 		created: 'March 21st 2019, 9:29:06 am',
// 		recipeName: 'tomatoes',
// 		dietTags: [
// 			'breakfast',
// 			'lunch',
// 			'dinner',
// 			'dessert',
// 			'dessert',
// 			'snack',
// 			'vegan',
// 			'vegetarian',
// 			'paleo',
// 		],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'tomato',
// 				amount: '5',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'cycTeze2NhVRlehuX9zZ',
// 	},
// 	{
// 		meal: 'l1',
// 		edited: false,
// 		directions: 'sdfsdfs',
// 		imageURL: 'https://edge.bonnieplants.com/www/uploads/20180920003719/debut-tomato.jpg',
// 		created: 'March 25th 2019, 3:55:55 pm',
// 		recipeName: 'uid test 2',
// 		dietTags: ['dinner', 'dessert'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'tomato',
// 				amount: 'one',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'GEJrw7bCItHrGfixnprI',
// 	},
// 	{
// 		meal: 'l2',
// 		id: 'T5Nim15X8YAbpx6TEhsq',
// 		edited: false,
// 		directions: '',
// 		imageURL:
// 			'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/6:4/w_620%2Ch_413/the-ultimate-hamburger.jpg',
// 		created: 'March 25th 2019, 9:45:33 am',
// 		recipeName: 'hamburger',
// 		dietTags: [],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'tomato',
// 				amount: '1/2',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 		],
// 		upvotes: 0,
// 	},
// 	{
// 		meal: 'd2',
// 		id: 'Ejm3xq7ZgGKzt7dOzite',
// 		edited: false,
// 		directions:
// 			'Thinly shred the green cabbage, grate the carrot, finely dice the bell pepper, and put them all in a big mixing bowl.\nIn a smaller mixing bowl whisk the mayo, vinegar, sweetener, celery seed, lime juice, garlic powder, salt, and pepper.\nPour the mixture over the veggies and stir. \n\n\n',
// 		imageURL:
// 			'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2015/07/2b74eac21cbb141925bdee577ff0c646587e33f2.jpeg',
// 		created: 'March 25th 2019, 9:29:03 am',
// 		recipeName: 'Cole Slaw',
// 		dietTags: ['snack', 'lunch', 'dinner', 'snack'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'green cabbage',
// 				amount: '1',
// 			},
// 			{
// 				name: 'red bell pepper',
// 				amount: '1',
// 			},
// 			{
// 				name: 'carrot',
// 				amount: '1',
// 			},
// 			{
// 				name: 'mayo',
// 				amount: '1/2 C.',
// 			},
// 			{
// 				name: 'apple cider vinegar',
// 				amount: '1/4 C.',
// 			},
// 			{
// 				amount: '2 Tbs.',
// 				name: 'agave nectar',
// 			},
// 			{
// 				name: 'celery seed',
// 				amount: '1 tsp.',
// 			},
// 			{
// 				name: 'lime juice',
// 				amount: '1 tsp.',
// 			},
// 			{
// 				name: 'garlic powder',
// 				amount: '1/2 tsp.',
// 			},
// 			{
// 				name: 'salt',
// 				amount: '1/2 tsp.',
// 			},
// 			{
// 				name: 'pepper',
// 				amount: 'to taste',
// 			},
// 		],
// 		upvotes: 0,
// 	},
// 	{
// 		meal: 'd1',
// 		imageURL: 'https://s3-us-west-1.amazonaws.com/itaic/595062455.jpg',
// 		created: 'redis test',
// 		recipeName: 'grene',
// 		dietTags: ['big money', 'fliff'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'big',
// 				amount: 'large',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'TWO2X0yN4MNQLOWOaax1',
// 		edited: false,
// 		directions: '1. haha thats not where lettuce goes',
// 	},
// 	{
// 		meal: 'b2',
// 		imageURL: 'https://edge.bonnieplants.com/www/uploads/20180920003719/debut-tomato.jpg',
// 		created: 'March 25th 2019, 10:36:14 am',
// 		recipeName: 'tomatoes',
// 		dietTags: ['dinner'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'tomato',
// 				amount: 'one',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'UFsC7tKAmkLJrDHGgtEh',
// 		edited: false,
// 		directions: 'chop chop',
// 	},
// 	{
// 		meal: 'l2',
// 		id: 'KhEHHJYt6XdBGEYlxV7B',
// 		edited: false,
// 		directions: 'chop and serve',
// 		imageURL: 'https://edge.bonnieplants.com/www/uploads/20180920003719/debut-tomato.jpg',
// 		created: 'March 25th 2019, 9:42:55 am',
// 		recipeName: 'test salad',
// 		dietTags: ['lunch', 'dinner', 'snack'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				amount: 'one',
// 				name: 'cucumber',
// 			},
// 			{
// 				name: 'tomato',
// 				amount: 'one',
// 			},
// 			{
// 				name: 'green onion',
// 				amount: 'one',
// 			},
// 		],
// 		upvotes: 2,
// 	},
// 	{
// 		meal: 'd1',
// 		dietTags: [],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'green cabbage',
// 				amount: 'one',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 		],
// 		upvotes: 0,
// 		id: 'QiKYeu9TeMjCEXr0uVk5',
// 		edited: false,
// 		directions: '',
// 		imageURL:
// 			'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2015/07/2b74eac21cbb141925bdee577ff0c646587e33f2.jpeg',
// 		created: 'March 25th 2019, 9:26:22 am',
// 		recipeName: 'Cole Slaw',
// 	},
// 	{
// 		meal: 'b1',
// 		id: 'Ah2FXI3J4pcOiE6n4Azk',
// 		edited: false,
// 		directions: '',
// 		imageURL:
// 			'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2015/07/2b74eac21cbb141925bdee577ff0c646587e33f2.jpeg',
// 		created: 'March 25th 2019, 9:26:22 am',
// 		recipeName: 'Cole Slaw',
// 		dietTags: [],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'green cabbage',
// 				amount: 'one',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 			{
// 				name: '',
// 				amount: '',
// 			},
// 			{
// 				amount: '',
// 				name: '',
// 			},
// 		],
// 		upvotes: 0,
// 	},
// 	{
// 		meal: 'l1',
// 		id: 'Ff27RjuRznn8oOfdZNkj',
// 		edited: false,
// 		directions: 'chop',
// 		imageURL: 'https://edge.bonnieplants.com/www/uploads/20180920003719/debut-tomato.jpg',
// 		created: 'March 25th 2019, 10:23:45 am',
// 		recipeName: 'test recipe 2',
// 		dietTags: ['dessert', 'snack'],
// 		public: true,
// 		user: 'nkDCS5Ufu1TbhDstboMwvyIirPi2',
// 		ingredient: [
// 			{
// 				name: 'tomato',
// 				amount: '1',
// 			},
// 		],
// 		upvotes: 0,
// 	},
// ]

class Section extends Component {
	render() {
		console.log('section props', this.props)
		return (
			<div className='sec-2'>
				{this.props.plan.map((meal, index) => {
					if (meal.code.includes(this.props.day)) {
						return (
							<section>
								<div>
									{/* <p>breakfast</p> */}
									{this.props.plan[index].code[0] === 'b' ? (
										<div className='meal'>
											{this.props.plan[index].code[0] === 'b' ? (
												<p>breakfast</p>
											) : this.props.plan[index].code[0] === 'l' ? (
												<p>lunch</p>
											) : this.props.plan[index].code[0] === 'd' ? (
												<p>dinner</p>
											) : this.props.plan[index].code[0] === 's' ? (
												<p>snaks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
										</div>
									) : this.props.plan[index].code[0] === 'l' ? (
										<div className='meal'>
											{this.props.plan[index].code[0] === 'b' ? (
												<p>breakfast</p>
											) : this.props.plan[index].code[0] === 'l' ? (
												<p>lunch</p>
											) : this.props.plan[index].code[0] === 'd' ? (
												<p>dinner</p>
											) : this.props.plan[index].code[0] === 's' ? (
												<p>snaks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
										</div>
									) : this.props.plan[index].code[0] === 'd' ? (
										<div className='meal'>
											{this.props.plan[index].code[0] === 'b' ? (
												<p>breakfast</p>
											) : this.props.plan[index].code[0] === 'l' ? (
												<p>lunch</p>
											) : this.props.plan[index].code[0] === 'd' ? (
												<p>dinner</p>
											) : this.props.plan[index].code[0] === 's' ? (
												<p>snaks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
										</div>
									) : this.props.plan[index].code[0] === 's' ? (
										<div className='meal'>
											{this.props.plan[index].code[0] === 'b' ? (
												<p>breakfast</p>
											) : this.props.plan[index].code[0] === 'l' ? (
												<p>lunch</p>
											) : this.props.plan[index].code[0] === 'd' ? (
												<p>dinner</p>
											) : this.props.plan[index].code[0] === 's' ? (
												<p>snaks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
										</div>
									) : null}
								</div>
								{/* <div className='meal'>
									<p>lunch</p>
									{this.props.plan[index].code[0] === 'l' ? (
										<div>{this.props.plan[index].recipe.recipeName}</div>
									) : null}
								</div>
								<div className='meal'>
									<p>dinner</p>
									{this.props.plan[index].code[0] === 'd' ? (
										<div>{this.props.plan[index].recipe.recipeName}</div>
									) : null}
								</div>
								<div className='meal'>
									<p>snack</p>
									{this.props.plan[index].code[0] === 's' ? (
										<div>{this.props.plan[index].recipe.recipeName}</div>
									) : null}
								</div> */}
							</section>
						)
					}
				})}
			</div>
		)
	}
}

export default Section
