import React, { Component } from "react";
import PlanDay from '../PlanDayTemplate/PlanDay'

//This component uses the current recipe from state on Home component to fill in the meal plan,
//id's and names are stored for each meal the user clicks after inspecting a receipe
class Planner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      b1: [],
      b2: [],
      b3: [],
      b4: [],
      b5: [],
      b6: [],
      b7: [],
      l1: [],
      l2: [],
      l3: [],
      l4: [],
      l5: [],
      l6: [],
      l7: [],
      d1: [],
      d2: [],
      d3: [],
      d4: [],
      d5: [],
      d6: [],
      d7: [],
      s1: [],
      s2: [],
      s3: [],
      s4: [],
      s5: [],
      s6: [],
      s7: []
    };
  }


  handleChange = meal => {
    this.setState(prevState => ({
      ...prevState,
      [meal]: [
        ...prevState[meal],
        { name: this.props.currentRecipeName, id: this.props.currentRecipeId }
      ]
    }));
  };

  removeRecipe = (meal, i) => {
    let meals = [...this.state[meal]];
    meals.splice(i, 1);
    this.setState({ [meal]: meals });
  };

  submitPlan = () =>{
    
  }

  render() {
    return (
      <div>
        <div className='planner-main'>
          <h1>Planner</h1>
          <div className='planner-top-section'>
{/* day one plan */}
          <PlanDay
          breakfast={this.state.b1}
          lunch={this.state.l1}
          dinner={this.state.d1}
          snack={this.state.s1}
          day={"Day1"}
          b={"b1"}
          l={"l1"}
          d={"d1"}
          s={"s1"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
{/* day two plan */}
          <PlanDay
          breakfast={this.state.b2}
          lunch={this.state.l2}
          dinner={this.state.d2}
          snack={this.state.s2}
          day={"Day2"}
          b={"b2"}
          l={"l2"}
          d={"d2"}
          s={"s2"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
{/* day three plan */}
          <PlanDay
          breakfast={this.state.b3}
          lunch={this.state.l3}
          dinner={this.state.d3}
          snack={this.state.s3}
          day={"Day3"}
          b={"b3"}
          l={"l3"}
          d={"d3"}
          s={"s3"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
{/* day four plan */}
          <PlanDay
          breakfast={this.state.b4}
          lunch={this.state.l4}
          dinner={this.state.d4}
          snack={this.state.s4}
          day={"Day4"}
          b={"b4"}
          l={"l4"}
          d={"d4"}
          s={"s4"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
          </div>
          <div className='planner-bottom-section'>
{/* day five plan */}
          <PlanDay
          breakfast={this.state.b5}
          lunch={this.state.l5}
          dinner={this.state.d5}
          snack={this.state.s5}
          day={"Day5"}
          b={"b5"}
          l={"l5"}
          d={"d5"}
          s={"s5"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
{/* day six plan */}
          <PlanDay
          breakfast={this.state.b6}
          lunch={this.state.l6}
          dinner={this.state.d6}
          snack={this.state.s6}
          day={"Day6"}
          b={"b6"}
          l={"l6"}
          d={"d6"}
          s={"s6"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
{/* day seven plan */}
          <PlanDay
          breakfast={this.state.b7}
          lunch={this.state.l7}
          dinner={this.state.d7}
          snack={this.state.s7}
          day={"Day7"}
          b={"b7"}
          l={"l7"}
          d={"d7"}
          s={"s7"}
          handleChange={this.handleChange}
          removeRecipe={this.removeRecipe}
          />
          
          </div>
        </div>
      </div>
    );
  }
}

export default Planner;
