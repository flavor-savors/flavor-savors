import React, { Component } from "react";
import SmallRecipes from "../Recipes/SmallRecipe/SmallRecipe";
import Planner from "../PlannerDrawer/Planner/Planner";
import Filter from "../FilterDrawer/Filter";
import axios from "axios";
import firebase from "../firebase/firebase";
import RecipeCreator from "../RecipeCreator/RecipeCreator";

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
      filteredRecipes: [],
      uid: false
    };
  }

  //calls for a set of recipes based on where the user is coming from and sets them to a default recipes array and an array to use for filtering
  //toggles planner open if coming from the 'build' link on the landing page
  //
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ uid: user.uid });
      // console.log(this.state.uid);
    });
    if (this.props.history.location.pathname === "/home/build") {
      this.togglePlanner();
    }
    axios.get(`/recipes/all`).then(res => {
      this.setState({ recipes: res.data });
      this.setState({ filteredRecipes: res.data });
    });
  }

//calls for current users favorites  
  viewUserFavRecipes = () => {
    if (this.state.uid !== false) {
      axios.get(`/users/favorites/${this.state.uid}`).then(res => {
        this.setState({ filteredRecipes: res.data });
      });
    }
  };

//calls for current users own input recipes    
  viewUserInputRecipes = () => {
    axios.get(`/recipes/${this.state.uid}`).then(res => {
      this.setState({ filteredRecipes: res.data });
    });
  };

  //open and closes the planner
  togglePlanner = add => {
    this.setState({ showPlanner: !this.state.showPlanner });
  };

  //opens and closes the filter
  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  //sets the current recipe name and id so the information is ready to be input into the meal planner or added to user favorites
  setCurrentRecipe = (id, name) => {
    this.setState({ currentRecipeId: id, currentRecipeName: name });
  };

  //set the array of filters on click of the checkbox on the filter component
  //deletes if it is already in the array, or adds if not currently in the array
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

  //filters the filtered array using the array of filter tags
  //if no tags will return all recipes
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

  //resets the array of filters and resets the filtered recipes to all recipes, when called the checkboxes on the filter component are cleared
  resetFilters = () => {
    this.setState({ filteredRecipes: this.state.recipes, filters: [] });
  };

  //adds the current recipe id to the users favorites
  addToFavorites = id => {
    axios.put(`/users/favorites/${id}`, {
      uid: firebase.auth().currentUser.uid
    });
  };

  deleteRecipeFromCurrent = (id) => {
    
    let newRecipes = this.state.filteredRecipes
    console.log(id)

    for(let i=0; i<newRecipes.length; i++){
      if(id === newRecipes[i].id){
        newRecipes.splice(i, 1)
      }
    }
    this.setState({filteredRecipes: newRecipes})
  }

  render() {
    // console.log(firebase.auth().currentUser);
    return (
      <div className='home-main'>
      <RecipeCreator/>

      <div>
        {this.state.uid !== false ?
        <div>
          <button onClick={this.viewUserFavRecipes}>View My Favorites</button>
          <button onClick={this.viewUserInputRecipes}>View My Own Recipes</button> 
        </div>
        : null}
        <button onClick={this.resetFilters}>View All Recipes</button>
        <button onClick={this.toggleFilter}>filter search</button>
        <button onClick={this.togglePlanner}>planner</button>
      </div>


        <div className='home-components'>
          {!this.state.showFilter ? null : (
            <Filter
              filterSearch={this.filterSearch}
              setFilters={this.setFilters}
              resetFilters={this.resetFilters}
            />
          )}

          <SmallRecipes
            uid={this.state.uid}
            recipes={this.state.filteredRecipes}
            showPlanner={this.state.showPlanner}
            setCurrentRecipe={this.setCurrentRecipe}
            togglePlanner={this.togglePlanner}
            addToFavorites={this.addToFavorites}
            deleteRecipeFromCurrent={this.deleteRecipeFromCurrent}
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
