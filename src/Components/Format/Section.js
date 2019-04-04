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
                  {this.props.plan[index].code[0] === "b" ? (
                    <div className='meal'>
                      <div>
                        {this.props.plan[index].code[0] === "b" ? (
                          <h3>Breakfast</h3>
                        ) : this.props.plan[index].code[0] === "l" ? (
                          <h3>Lunch</h3>
                        ) : this.props.plan[index].code[0] === "d" ? (
                          <h3>Dinner</h3>
                        ) : this.props.plan[index].code[0] === "s" ? (
                          <h3>Snacks</h3>
                        ) : (
                          <h3>what did you do</h3>
                        )}
                        {this.props.plan[index].recipe.recipeName}
                        <h4>ingredients</h4>
                        {this.props.plan[index].recipe.ingredient.map(ing => (
                          <div key={meal.unix} className='ingredients'>
                            <div>{ing.amount}</div>
                            <div>{ing.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className='directions'>
                        <h4>DIRECTIONS: </h4>
                        {this.props.plan[index].recipe.directions}
                      </div>
                    </div>
                  ) : this.props.plan[index].code[0] === "l" ? (
                    <div className='meal'>
                      <div>
                        {this.props.plan[index].code[0] === "b" ? (
                          <h3>Breakfast</h3>
                        ) : this.props.plan[index].code[0] === "l" ? (
                          <h3>Lunch</h3>
                        ) : this.props.plan[index].code[0] === "d" ? (
                          <h3>Dinner</h3>
                        ) : this.props.plan[index].code[0] === "s" ? (
                          <h3>Snacks</h3>
                        ) : (
                          <h3>what did you do</h3>
                        )}
                        {this.props.plan[index].recipe.recipeName}
                        <h3>ingredients</h3>
                        {this.props.plan[index].recipe.ingredient.map(ing => (
                          <div key={meal.unix} className='ingredients'>
                            <div>{ing.amount}</div>
                            <div>{ing.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className='directions'>
                        <h4>DIRECTIONS: </h4>
                        {this.props.plan[index].recipe.directions}
                      </div>
                    </div>
                  ) : this.props.plan[index].code[0] === "d" ? (
                    <div className='meal'>
                      <div>
                        {this.props.plan[index].code[0] === "b" ? (
                          <h3>Breakfast</h3>
                        ) : this.props.plan[index].code[0] === "l" ? (
                          <h3>Lunch</h3>
                        ) : this.props.plan[index].code[0] === "d" ? (
                          <h3>Dinner</h3>
                        ) : this.props.plan[index].code[0] === "s" ? (
                          <h3>Snacks</h3>
                        ) : (
                          <h3>what did you do</h3>
                        )}
                        {this.props.plan[index].recipe.recipeName}
                        <h3>ingredients</h3>
                        {this.props.plan[index].recipe.ingredient.map(ing => (
                          <div key={meal.unix} className='ingredients'>
                            <div>{ing.amount}</div>
                            <div>{ing.name}</div>
                          </div>
                        ))}
                      </div>{" "}
                      <div className='directions'>
                        <h4>DIRECTIONS: </h4>
                        {this.props.plan[index].recipe.directions}
                      </div>
                    </div>
                  ) : this.props.plan[index].code[0] === "s" ? (
                    <div className='meal'>
                      <div>
                        {this.props.plan[index].code[0] === "b" ? (
                          <h3>Breakfast</h3>
                        ) : this.props.plan[index].code[0] === "l" ? (
                          <h3>Lunch</h3>
                        ) : this.props.plan[index].code[0] === "d" ? (
                          <h3>Dinner</h3>
                        ) : this.props.plan[index].code[0] === "s" ? (
                          <h3>Snacks</h3>
                        ) : (
                          <h3>what did you do</h3>
                        )}
                        {this.props.plan[index].recipe.recipeName}
                        <h3>ingredients</h3>
                        {this.props.plan[index].recipe.ingredient.map(ing => (
                          <div key={meal.unix} className='ingredients'>
                            <div>{ing.amount}</div>
                            <div>{ing.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className='directions'>
                        <h4>DIRECTIONS: </h4>
                        {this.props.plan[index].recipe.directions}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            );
          }
        })}
      </div>
    );
  }
}

export default Section;
