import React, { Component } from "react";
// import ReactToPrint from "react-to-print";

class MealPlaner extends Component {
  //recieves this.props.plannerProps which is an array of objects
  //map through
  render() {
    console.log(this.props);

    return (
      <div className='format'>
        <button onClick={this.props.toggleMealPlan}>Close Plan</button>
        <main>
          <nav>
            <h1>Meal Plan</h1>
          </nav>

          <div className='box'>
            <div className='container-1'>
              <section className='col-1' />
            </div>

            <div className='container-2'>
              <section className='sec-2'>
                <div className='meal'>
                  <p>breakfast</p>
                  {/* reusableComponent with b1 passed in */}
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
