import React, { Component } from "react";
// import SmallRecipes from "../Recipes/SmallRecipe/SmallRecipe";
// import Planner from "../PlannerDrawer/Planner";
// import Filter from "../FilterDrawer/Filter";
import axios from "axios";
import ForumHome from '../Forum/ForumHome/ForumHome'

//this component is the main home page for browsing/searching recipes and meal planning
//it renders 5 views:

//default:
//SmallRecipes (with specific call)
//based on url param to toggle planner to visible state:
//SmallRecipes & Planner
//user based toggles:
//SmallRecipes & Filter
//SmallRecipes & Filter & Planner

class Home extends Component {
  constructor() {
    super();

    this.state = {
      showPlanner: false,
      showFilter: false,
      currentRecipeId: "",
      currentRecipeName: "",
      filters: []
    };
  }

  componentDidMount() {
      if(this.props.history.location.pathname === "/home/build"){
          this.togglePlanner()
      }
    axios.get(`/recipes/all`).then(res => {
      this.setState({ recipes: res.data });
    });
  }

  setCurrentRecipe = (id, name) => {
    this.setState({ currentRecipeId: id, currentRecipeName: name });
  };

  togglePlanner = add => {
    this.setState({ showPlanner: !this.state.showPlanner });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  filterSearch = () => {};

  render() {
    return (
      <div className='home-main'>
      <ForumHome/>


        {/* <button onClick={this.toggleFilter}>filter search</button>
        <button onClick={this.togglePlanner}>planner</button>

        <div className='home-components'>
          <SmallRecipes
            setCurrentRecipe={this.setCurrentRecipe}
            toggleFilter={this.toggleFilter}
            togglePlanner={this.togglePlanner}
          />

          {!this.state.showPlanner ? null : (
            <Planner
              currentRecipeId={this.state.currentRecipeId}
              currentRecipeName={this.state.currentRecipeName}
            />
          )}
          {!this.state.showFilter ? null : (
            <Filter filterSearch={this.filterSearch} />
          )}
        </div> */}
      </div>
    );
  }
}

export default Home;
