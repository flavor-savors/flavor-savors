import React, { Component } from 'react'

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
												<p>snacks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div>
													<h1>ingredients</h1>
													<div>{ing.name}</div>
													<div>{ing.amount}</div>
												</div>
											))}
											{this.props.plan[index].recipe.directions}
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
												<p>snacks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div>
													<h1>ingredients</h1>
													<div>{ing.name}</div>
													<div>{ing.amount}</div>
												</div>
											))}
											{this.props.plan[index].recipe.directions}
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
												<p>snacks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div>
													<h1>ingredients</h1>
													<div>{ing.name}</div>
													<div>{ing.amount}</div>
												</div>
											))}
											{this.props.plan[index].recipe.directions}
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
												<p>snacks</p>
											) : (
												<p>what did you do</p>
											)}
											{this.props.plan[index].recipe.recipeName}
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div>
													<h1>ingredients</h1>
													<div>{ing.name}</div>
													<div>{ing.amount}</div>
												</div>
											))}
											{this.props.plan[index].recipe.directions}
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
