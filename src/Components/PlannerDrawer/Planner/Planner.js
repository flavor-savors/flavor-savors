import React, { Component } from 'react'
import PlanDay from '../PlanDayTemplate/PlanDay'

//This component uses the current recipe from state on Home component to fill in the meal plan,
//id's and names are stored for each meal the user clicks after inspecting a receipe
class Planner extends Component {
	render() {
		return (
			<div className='planner-main'>
				<button onClick={this.props.submitPlan}>Generate Printable Plan</button>
				<div>
					<h1>Planner</h1>
					<p>View a recipe to add it to the plan</p>
					<p>Leaving this page will reset your plan!</p>
				</div>
				<div className='two-plan-boxes'>
					<div className='planner-top-section'>
						{/* day one plan */}
						<PlanDay
							breakfast={this.props.b1}
							lunch={this.props.l1}
							dinner={this.props.d1}
							snack={this.props.s1}
							day={'Day1'}
							b={'b1'}
							l={'l1'}
							d={'d1'}
							s={'s1'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
						{/* day two plan */}
						<PlanDay
							breakfast={this.props.b2}
							lunch={this.props.l2}
							dinner={this.props.d2}
							snack={this.props.s2}
							day={'Day2'}
							b={'b2'}
							l={'l2'}
							d={'d2'}
							s={'s2'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
						{/* day three plan */}
						<PlanDay
							breakfast={this.props.b3}
							lunch={this.props.l3}
							dinner={this.props.d3}
							snack={this.props.s3}
							day={'Day3'}
							b={'b3'}
							l={'l3'}
							d={'d3'}
							s={'s3'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
						{/* day four plan */}
						<PlanDay
							breakfast={this.props.b4}
							lunch={this.props.l4}
							dinner={this.props.d4}
							snack={this.props.s4}
							day={'Day4'}
							b={'b4'}
							l={'l4'}
							d={'d4'}
							s={'s4'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
					</div>
					<div className='planner-bottom-section'>
						{/* day five plan */}
						<PlanDay
							breakfast={this.props.b5}
							lunch={this.props.l5}
							dinner={this.props.d5}
							snack={this.props.s5}
							day={'Day5'}
							b={'b5'}
							l={'l5'}
							d={'d5'}
							s={'s5'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
						{/* day six plan */}
						<PlanDay
							breakfast={this.props.b6}
							lunch={this.props.l6}
							dinner={this.props.d6}
							snack={this.props.s6}
							day={'Day6'}
							b={'b6'}
							l={'l6'}
							d={'d6'}
							s={'s6'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
						{/* day seven plan */}
						<PlanDay
							breakfast={this.props.b7}
							lunch={this.props.l7}
							dinner={this.props.d7}
							snack={this.props.s7}
							day={'Day7'}
							b={'b7'}
							l={'l7'}
							d={'d7'}
							s={'s7'}
							handleChange={this.props.handleChange}
							removeRecipe={this.props.removeRecipe}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Planner
