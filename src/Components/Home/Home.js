import React, { Component } from "react";
import SmallRecipes from "../Recipes/SmallRecipe/SmallRecipe";
import Planner from "../PlannerDrawer/Planner/Planner";
import Filter from "../FilterDrawer/Filter";
import axios from "axios";

// import RecipeCreator from '../RecipeCreator/RecipeCreator'


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
      filters: [],
      recipes:[]
    };
  }

  componentDidMount() {
      if(this.props.history.location.pathname === "/home/build"){
          this.togglePlanner()
      }
      if(this.props.history.location.pathname === "/home/favorites"){
//still need autorization set up for this endpoint
        // axios.get(`/users/favorites/${uid}`).then(res => {
        //   this.setState({ recipes: res.data });
        //   });        
      }
      if(this.props.history.location.pathname === "/home/myrecipes"){
//still need autorization set up for this endpoint
        // axios.get(`/recipes/${uid}`).then(res => {
        //   this.setState({ recipes: res.data });
        //   });
      }
      else{
        axios.get(`/recipes/all`).then(res => {
        this.setState({ recipes: res.data });
        });
      }
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

  setFilters = (filter) =>{
    this.setState(prevState => ({
      ...prevState,
      filters: [
        ...prevState.filters,
        filter
      ]
    }));
    console.log(this.state.filters)
  }

  filterSearch = () => {
    // let filtered = this.state.recipes.filter()
  };

  addToFavorites = () => {
//still need autorization set up for this endpoint
    // axios.put(`/users/favorites/:${uid}`)
  };


  render() {
    return (
      <div className='home-main'>

      {/* <RecipeCreator/> */}

        <button onClick={this.toggleFilter}>filter search</button>
        <button onClick={this.togglePlanner}>planner</button>

        <div className='home-components'>

          {!this.state.showFilter ? null : (
            <Filter 
            setFilters={this.setFilters}
            filterSearch={this.filterSearch} />
          )}

          <SmallRecipes
            recipes={this.state.recipes}
            setCurrentRecipe={this.setCurrentRecipe}
            toggleFilter={this.toggleFilter}
            togglePlanner={this.togglePlanner}
            addToFavorites={this.addToFavorites}
          />

          {!this.state.showPlanner ? null : (
            <Planner
              currentRecipeId={this.state.currentRecipeId}
              currentRecipeName={this.state.currentRecipeName}
            />
          )}

        </div>
      </div>
    );
  }
}

export default Home;
