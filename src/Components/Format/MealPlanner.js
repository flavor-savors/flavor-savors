import React, { Component } from 'react'
// import ReactToPrint from "react-to-print";
import Section from './Section'

class MealPlaner extends Component {
	//recieves this.props.plannerProps which is an array of objects
	//map through
	constructor(props) {
		super(props)

		this.state = {
			ingredients: [],
		}
	}

	// componentDidUpdate(prevProps) {}

	render() {
		let list = []
		let singleArr = []
		if (this.props.plannerProps.length > 0) {
			list = this.props.plannerProps.map((meal, i) => {
				return meal.ingredients.map((ing) => ing.name)
			})

			for (let i = 0; i < list.length; i++) {
				for (let j = 0; j < list[i].length; j++) {
					singleArr.push(list[i][j])
				}
			}

			singleArr = singleArr
				.filter((name, index) => singleArr.indexOf(name) === index)
				.filter((name) => name !== '')
		}
		return (
			<div className='format'>
				<button onClick={this.props.toggleMealPlan}>Close Plan</button>
				<main className='meal-planner-main'>
					<nav>
						<h1>Meal Plan</h1>
					</nav>

					<div className='box'>
						<div className='container-1'>
							<section className='col-1'>
								<p>Grocery list</p>
								{singleArr.length > 0 ? singleArr.map((ing) => <div>{ing}</div>) : null}
							</section>
						</div>

						<div className='container-2'>
							<Section plan={this.props.plannerProps} day={1} />
							<Section plan={this.props.plannerProps} day={2} />
							<Section plan={this.props.plannerProps} day={3} />
							<Section plan={this.props.plannerProps} day={4} />
							<Section plan={this.props.plannerProps} day={5} />
							<Section plan={this.props.plannerProps} day={6} />
							<Section plan={this.props.plannerProps} day={7} />
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default MealPlaner

// *TODO: fwgrw
// ** wfrfwegwg
// *? efrqrgfrwegergg
// *! freferfqefwerferg
