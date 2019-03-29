import React, { Component } from "react";

class Section extends Component {
	render() {
		return (
			<div className='sec-2'>
				{this.props.plan.map((meal, index) => {
					if (meal.code.includes(this.props.day)) {
						return (
							<section key={meal.recipe.id}>
								<div>
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
											<h1>ingredients</h1>
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div key={meal.unix}>
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
											<h1>ingredients</h1>
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div key={meal.unix}>
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
											<h1>ingredients</h1>
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div key={meal.unix}>
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
											<h1>ingredients</h1>
											{this.props.plan[index].recipe.ingredient.map((ing) => (
												<div key={meal.unix}>
													<div>{ing.name}</div>
													<div>{ing.amount}</div>
												</div>
											))}
											{this.props.plan[index].recipe.directions}
										</div>
									) : null}
								</div>
							</section>
						)
					}
				})}
			</div>
		)
	}
}

export default Section;
