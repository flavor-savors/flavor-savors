import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import MealPlanner from "./MealPlanner";

class PlanWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(ReactToPrint);
    // console.log(this.props);
    return (
      <div>
        <ReactToPrint
          trigger={() => <button href='#'>Print this out!</button>}
          // master:src/Components/Format/MealPlanner.js
          content={() => this.componentRef}
          pageStyle={{
            padding: "20px"
          }}
          bodyClass={{ height: "50vh" }}
        />
        <MealPlanner
          ref={el => (this.componentRef = el)}
          plannerProps={this.props}
        />
      </div>
    );
  }
}

export default PlanWrapper;
