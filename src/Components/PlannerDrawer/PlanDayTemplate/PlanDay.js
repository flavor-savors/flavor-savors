import React, { Component } from "react";


//this component takes in props to render a single day of meal planning

// props needed day, b, l, d, s, handleChange, removeRecipe


class PlanDay extends Component {
componentDidMount(){
  console.log(this.props)
}

  render() {
    return (
      <div className='day'>

          <p className='day-title'>{this.props.day}</p>
          <div className='meal-names'>
            {this.props.breakfast.map((e, i) => {
              return (
                <div key={i} className='meal-name'>
                  <div>{e.name}</div>
                  <button
                    onClick={() => {
                      this.props.removeRecipe(this.props.b, i);
                    }}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => this.props.handleChange(this.props.b)}>Breakfast</button>
          <div className='meal-names'>
            {this.props.lunch.map((e, i) => {
              return (
                <div key={i} className='meal-name'>
                  <div>{e.name}</div>
                  <button
                    onClick={() => {
                      this.props.removeRecipe(this.props.l, i);
                    }}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => this.props.handleChange(this.props.l)}>Lunch</button>
          <div className='meal-names'>
            {this.props.dinner.map((e, i) => {
              return (
                <div key={i} className='meal-name'>
                  <div>{e.name}</div>
                  <button
                    onClick={() => {
                      this.props.removeRecipe(this.props.d, i);
                    }}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => this.props.handleChange(this.props.d)}>Dinner</button>
          <div className='meal-names'>
            {this.props.snack.map((e, i) => {
              return (
                <div key={i} className='meal-name'>
                  <div>{e.name}</div>
                  <button
                    onClick={() => {
                      this.props.removeRecipe(this.props.s, i);
                    }}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => this.props.handleChange(this.props.s)}>Snack</button>

      </div>
    );
  }
}

export default PlanDay;
