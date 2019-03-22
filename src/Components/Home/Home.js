import React, { Component } from "react";
import SmallRecipes from "../Recipes/SmallRecipe/SmallRecipe";
import Planner from "../PlannerDrawer/Planner/Planner";
import Filter from "../FilterDrawer/Filter";
import axios from "axios";
import firebase from '../firebase/firebase'

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
      recipes: [],
      filters: [],
      filteredRecipes: []
    };
  }

  componentDidMount() {
    if (this.props.history.location.pathname === "/home/build") {
      this.togglePlanner();
    }
    if (this.props.history.location.pathname === "/home/favorites") {
      axios.get(`/users/favorites/${firebase.auth().currentUser.uid}`).then(res => {
        this.setState({ recipes: res.data });
        });
    }
    if (this.props.history.location.pathname === "/home/myrecipes") {
      axios.get(`/recipes/${firebase.auth().currentUser.uid}`).then(res => {
        this.setState({ recipes: res.data });
        });
    } else {
      axios.get(`/recipes/all`).then(res => {
        this.setState({ recipes: res.data });
        this.setState({ filteredRecipes: res.data });
      });
    }
    // console.log(this.state)
  }



  togglePlanner = add => {
    this.setState({ showPlanner: !this.state.showPlanner });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };


  //sets the current recipe name and id so the information is ready to be input into the meal planner
  setCurrentRecipe = (id, name) => {
    this.setState({ currentRecipeId: id, currentRecipeName: name });
  };

  
//set 
  setFilters = tag => {
    if (this.state.filters.includes(tag)) {
      let filters = this.state.filters;
      let newFilters = [];
      for (let i = 0; i < filters.length; i++) {
        if (tag !== filters[i]) {
          newFilters.push(filters[i]);
        }
      }
      this.setState({ filters: newFilters });
    } else {
      this.setState(prevState => ({
        ...prevState,
        filters: [...prevState.filters, tag]
      }));
    }
    console.log(this.state);
  };

  filterSearch = () => {
    if (!this.state.filters.length) {
      this.setState({ filteredRecipes: this.state.recipes });
    } else {
      const recipes = this.state.recipes;
      const filters = this.state.filters;
      let filtered = [];
      for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].dietTags.length; j++) {
          if (filters.includes(recipes[i].dietTags[j])) {
            filtered.push(recipes[i]);
            break;
          }
        }
      }
      this.setState({ filteredRecipes: filtered });
    }
  };

  resetFilters = () => {
    this.setState({filteredRecipes:this.state.recipes, filters: []})
  }

  addToFavorites = () => {
    axios.put(`/users/favorites/${this.state.currentRecipeID}`, {uid: firebase.auth().currentUser.uid})
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
              filterSearch={this.filterSearch}
              setFilters={this.setFilters}
              resetFilters={this.resetFilters}
            />
          )}

          <SmallRecipes
            recipes={this.state.filteredRecipes}
            setCurrentRecipe={this.setCurrentRecipe}
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
