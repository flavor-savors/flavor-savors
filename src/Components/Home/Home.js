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
      user: "",
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

  //calls for a set of recipes based on where the user is coming from and sets them to a default recipes array and an array to use for filtering
  //toggles planner open if coming from the 'build' link on the landing page
  //
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user.uid });
      console.log(this.state.user);
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
    if (this.state.user !=="") {
      axios.get(`/users/favorites/${this.state.user}`).then(res => {
        this.setState({ filteredRecipes: res.data });
      });
    }
  };

//calls for current users own input recipes    
  viewUserInputRecipes = () => {
    axios.get(`/recipes/${this.state.user}`).then(res => {
      console.log(res.data)
      this.setState({ filteredRecipes: res.data });
    });
  };

//Functionality for SmallRecipes
  //adds the current recipe id to the users favorites
  addToFavorites = id => {
    axios.put(`/users/favorites/${id}`, {
      uid: this.state.user
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

//when a recipe is deleted from database this removes it from the filteredArray as well
  deleteRecipeFromCurrent = (id) => {
    let newRecipes = this.state.filteredRecipes
    for(let i=0; i<newRecipes.length; i++){
      if(id === newRecipes[i].id){
        newRecipes.splice(i, 1)
      }
    }
    this.setState({filteredRecipes: newRecipes})
  }
  
//functionality for Filter component
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

  //filters the filteredArray using the array of filter tags
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

//functionality for the planner
handleChange = meal => {
  this.setState(prevState => ({
    ...prevState,
    [meal]: [
      ...prevState[meal],
      { name: this.state.currentRecipeName, id: this.state.currentRecipeId }
    ]
  }));
};

removeRecipe = (meal, i) => {
  let meals = [...this.state[meal]];
  meals.splice(i, 1);
  this.setState({ [meal]: meals });
};

submitPlan = () =>{
  
}



  render() {
    // console.log(firebase.auth().currentUser);
    return (
      <div className='home-main'>
      {/* <RecipeCreator/> */}
      <div>
        {this.state.user.length ?
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
            user={this.state.user}
            recipes={this.state.filteredRecipes}
            showPlanner={this.state.showPlanner}
            setCurrentRecipe={this.setCurrentRecipe}
            togglePlanner={this.togglePlanner}
            addToFavorites={this.addToFavorites}
            deleteRecipeFromCurrent={this.deleteRecipeFromCurrent}
          />

          {!this.state.showPlanner ? null : (
            <Planner
              b1={this.state.b1}
              b2={this.state.b2}
              b3={this.state.b3}
              b4={this.state.b4}
              b5={this.state.b5}
              b6={this.state.b6}
              b7={this.state.b7}
              l1={this.state.l1}
              l2={this.state.l2}
              l3={this.state.l3}
              l4={this.state.l4}
              l5={this.state.l5}
              l6={this.state.l6}
              l7={this.state.l7}
              d1={this.state.d1}
              d2={this.state.d2}
              d3={this.state.d3}
              d4={this.state.d4}
              d5={this.state.d5}
              d6={this.state.d6}
              d7={this.state.d7}
              s1={this.state.s1}
              s2={this.state.s2}
              s3={this.state.s3}
              s4={this.state.s4}
              s5={this.state.s5}
              s6={this.state.s6}
              s7={this.state.s7}
              handleChange={this.handleChange}
              removeRecipe={this.removeRecipe}
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
