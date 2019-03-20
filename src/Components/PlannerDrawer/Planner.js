import React, { Component } from "react";

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

  componentDidMount() {
    // console.log(this.props.currentRecipe)
  }

  handleChange = meal => {
    this.setState(prevState => ({
      ...prevState,
      [meal]: [
        ...prevState[meal],
        { name: this.props.currentRecipeName, id: this.props.currentRecipeId }
      ]
    }));
    console.log(this.state[meal]);
  };

  removeRecipe = (meal, i) => {
    let meals = [...this.state[meal]];
    meals.splice(i, 1);
    this.setState({ [meal]: meals });
  };

  render() {
    return (
      <div>
        <div className='planner-main'>
          Planner
          <div className='planner-top-section'>
{/* day one plan */}
            <div className='day'>
              <p className='day-title'>day1</p>
              <div className='meal-names'>
                {this.state.b1.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b1", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b1")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l1.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l1", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l1")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d1.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d1", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d1")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s1.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s1", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s1")}>Snack</button>
            </div>
{/* day two plan */}
            <div className='day'>
              <p className='day-title'>day2</p>
              <div className='meal-names'>
                {this.state.b2.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b2", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b2")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l2.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l2", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l2")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d2.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d2", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d2")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s2.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s2", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s2")}>Snack</button>
            </div>
{/* day three plan */}
            <div className='day'>
              <p className='day-title'>day3</p>
              <div className='meal-names'>
                {this.state.b3.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b3", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b3")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l3.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l3", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l3")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d3.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d3", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d3")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s3.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s3", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s3")}>Snack</button>
            </div>
{/* day four plan */}
            <div className='day'>
              <p className='day-title'>day4</p>
              <div className='meal-names'>
                {this.state.b4.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b4", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b4")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l4.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l4", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l4")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d4.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d4", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d4")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s4.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s4", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s1")}>Snack</button>
            </div>
          </div>
          <div className='planner-bottom-section'>
{/* day five plan */}
            <div className='day'>
              <p className='day-title'>day5</p>
              <div className='meal-names'>
                {this.state.b5.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b5", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b5")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l5.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l5", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l5")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d5.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d5", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d5")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s5.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s5", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s5")}>Snack</button>
            </div>
{/* day six plan */}
            <div className='day'>
              <p className='day-title'>day6</p>
              <div className='meal-names'>
                {this.state.b6.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b6", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b6")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l6.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l6", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l6")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d6.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d6", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d6")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s6.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s6", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s6")}>Snack</button>
            </div>
{/* day seven plan */}
            <div className='day'>
              <p className='day-title'>day7</p>
              <div className='meal-names'>
                {this.state.b7.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("b7", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("b7")}>Breakfast</button>
              <div className='meal-names'>
                {this.state.l7.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("l7", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("l7")}>Lunch</button>
              <div className='meal-names'>
                {this.state.d7.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("d7", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("d7")}>Dinner</button>
              <div className='meal-names'>
                {this.state.s7.map((e, i) => {
                  return (
                    <div key={i} className='meal-name'>
                      <div>{e.name}</div>
                      <button
                        onClick={() => {
                          this.removeRecipe("s7", i);
                        }}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => this.handleChange("s7")}>Snack</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Planner;
