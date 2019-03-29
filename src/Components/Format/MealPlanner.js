import React, { Component } from "react";
// import ReactToPrint from "react-to-print";
import Section from "./Section";

class MealPlaner extends Component {
  //recieves this.props.plannerProps which is an array of objects
  //map through

  constructor(props) {
    super(props);

    this.state = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.plannerProps.length < this.props.plannerProps) {
      for (let i = 1; i < 8; i++) {
        this.props.plannerProps.map(recipe => {
          if (recipe.code.includes(i)) {
            this.setState({
              [i]: recipe
            });
          }
        });
      }
    }
  }

  render() {
    // console.log('state', this.state)

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
              {/* <section className='sec-2'>
                <div className='meal'>
                  <p>breakfast</p>
                </div>
                <div className='meal'>
                  <p>lunch</p>
                </div>
                <div className='meal'>
                  <p>dinner</p>
                </div>
                <div className='meal'>
                  <p>snack</p>
                </div>
              </section> */}
              {/* <section className='sec-2'>
								<div className='meal'>
									<p>breakfast 2</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section>
							<section className='sec-2'>
								<div className='meal'>
									<p>breakfast</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section>
							<section className='sec-2'>
								<div className='meal'>
									<p>breakfast</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section>
							<section className='sec-2'>
								<div className='meal'>
									<p>breakfast</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section>
							<section className='sec-2'>
								<div className='meal'>
									<p>breakfast</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section>
							<section className='sec-2'>
								<div className='meal'>
									<p>breakfast</p>
								</div>
								<div className='meal'>
									<p>lunch</p>
								</div>
								<div className='meal'>
									<p>dinner</p>
								</div>
								<div className='meal'>
									<p>snack</p>
								</div>
							</section> */}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default MealPlaner;

// *TODO: fwgrw
// ** wfrfwegwg
// *? efrqrgfrwegergg
// *! freferfqefwerferg
