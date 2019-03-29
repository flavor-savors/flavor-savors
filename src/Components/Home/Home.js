import React, { Component } from "react";
import SmallRecipes from "../Recipes/SmallRecipe/SmallRecipe";
import Planner from "../PlannerDrawer/Planner/Planner";
import Filter from "../FilterDrawer/Filter";
import axios from "axios";
import firebase from "../firebase/firebase";
// import MealPlanner from "../Format/MealPlanner";
import PrintWrapper from "../Format/PrintWrapper";

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
      plannedRecipes: [],
      showMealPlan: false,
      queryContent: "",
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
      if (user !== null) {
        this.setState({ user: user.uid }, () => {
          if (this.props.history.location.pathname === "/home/favorites") {
            axios
              .get(`/users/favorites/recipes/${user.uid}`)
              .then(res => this.setState({ filteredRecipes: res.data }));
          }
        });
      }
    });

    if (this.props.history.location.pathname === "/home/build") {
      this.togglePlanner();
    }

    axios
      .get(`/recipes/all`)
      .then(res => {
        this.setState({ recipes: res.data });
      })
      .then(() => {
        if (
          this.props.history.location.pathname === "/home" ||
          this.props.history.location.pathname === "/home/build"
        ) {
          axios.get(`/recipes/all`).then(res => {
            this.setState({ filteredRecipes: res.data });
          });
        }
      });
  }

  //calls for current users favorites
  viewUserFavRecipes = () => {
    if (this.state.user !== "") {
      axios.get(`/users/favorites/recipes/${this.state.user}`).then(res => {
        this.setState({ filteredRecipes: res.data });
        // console.log(res.data);
      });
    }
  };

  //calls for current users own input recipes
  viewUserInputRecipes = () => {
    axios.get(`/recipes/${this.state.user}`).then(res => {
      // console.log(res.data);
      this.setState({ filteredRecipes: res.data });
    });
  };

  //Functionality for SmallRecipes
  //adds the current recipe id to the users favorites
  addToFavorites = id => {
    axios.put(`/users/favorites/${id}`, {
      uid: this.state.user
    });
    // console.log(this.state.user);
    // console.log("added to favs");
  };

  //open and closes the planner
  togglePlanner = add => {
    this.setState({ showPlanner: !this.state.showPlanner });
  };

  //opens and closes the filter
  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  toggleMealPlan = () => {
    this.setState({ showMealPlan: !this.state.showMealPlan });
    // console.log("it works");
  };

  //sets the current recipe name and id so the information is ready to be input into the meal planner or added to user favorites
  setCurrentRecipe = (id, name) => {
    this.setState({ currentRecipeId: id, currentRecipeName: name });
  };

  //when a recipe is deleted from database this removes it from the filteredArray as well
  deleteRecipeFromCurrent = id => {
    let newRecipes = this.state.filteredRecipes;
    for (let i = 0; i < newRecipes.length; i++) {
      if (id === newRecipes[i].id) {
        newRecipes.splice(i, 1);
      }
    }
    this.setState({ filteredRecipes: newRecipes });
  };

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
    // console.log(this.state);
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

  handleQuery = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  querySubmit = () => {
    axios
      .get(`/recipes/search/general?q=${this.state.queryContent}`)
      .then(res => {
        this.setState({ filteredRecipes: res.data });
        this.setState({ queryContent: "" });
      });
  };
  //functionality for the planner
  handleChange = meal => {
    if (this.state.currentRecipeId === "") {
      return null;
    } else {
      this.setState(prevState => ({
        ...prevState,
        [meal]: [
          ...prevState[meal],
          {
            name: this.state.currentRecipeName,
            id: this.state.currentRecipeId,
            code: meal
          }
        ]
      }));
    }
  };
  //removes recipe from planner
  removeRecipe = (meal, i) => {
    let meals = [...this.state[meal]];
    meals.splice(i, 1);
    this.setState({ [meal]: meals });
  };

  submitPlan = () => {
    this.setState({
      showMealPlan: !this.state.showMealPlan
    });
    let plan = {
      b1: this.state.b1,
      b2: this.state.b2,
      b3: this.state.b3,
      b4: this.state.b4,
      b5: this.state.b5,
      b6: this.state.b6,
      b7: this.state.b7,
      l1: this.state.l1,
      l2: this.state.l2,
      l3: this.state.l3,
      l4: this.state.l4,
      l5: this.state.l5,
      l6: this.state.l6,
      l7: this.state.l7,
      d1: this.state.d1,
      d2: this.state.d2,
      d3: this.state.d3,
      d4: this.state.d4,
      d5: this.state.d5,
      d6: this.state.d6,
      d7: this.state.d7,
      s1: this.state.s1,
      s2: this.state.s2,
      s3: this.state.s3,
      s4: this.state.s4,
      s5: this.state.s5,
      s6: this.state.s6,
      s7: this.state.s7
    };
    axios
      .post("/plans/create/clean", { plan: plan })
      .then(res => {
        // console.log('response: ', res.data)
        this.setState({
          plannedRecipes: res.data
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    // console.log(this.state.filteredRecipes);

    const showHideMealPlan = this.state.showMealPlan
      ? "meal-plan show-meal-plan"
      : "meal-plan hide-meal-plan";

    const showHideMain = this.state.showMealPlan
      ? "main-cond hide-home-main"
      : "main-cond show-home-main";

    return (
      <div className='home-main'>
        <div className={showHideMealPlan}>
          <PrintWrapper
            plannedRecipes={this.state.plannedRecipes}
            toggleMealPlan={this.toggleMealPlan}
          />
        </div>

        <div className={showHideMain}>
          <div className='home-header'>
            <div>
              <button onClick={this.toggleFilter} className='toggle-buttons'>
                OPEN FILTERS
              </button>
            </div>
            {this.state.user.length ? (
              <div className='home-user-buttons'>
                <button onClick={this.viewUserFavRecipes}>MY FAVORITES</button>
                <button onClick={this.viewUserInputRecipes}>MY RECIPES</button>
              </div>
            ) : null}
            <div>
              <button onClick={this.resetFilters} className='home-button'>
                ALL RECIPES
              </button>
            </div>
            <div className='search-bar'>
              <input
                type='text'
                name='queryContent'
                value={this.state.content}
                onChange={this.handleQuery}
              />
              <button onClick={this.querySubmit}>SEARCH</button>
            </div>

            <div>
              <button onClick={this.togglePlanner} className='toggle-buttons'>
                OPEN PLANNER
              </button>
            </div>
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
                toggleMealPlan={this.toggleMealPlan}
                submitPlan={this.submitPlan}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
