import React, { Component } from "react";
import axios from "axios";
import LargeRecipe from "../LargeRecipe/LargeRecipe";
import heart from "../../../Assets/heart.png";
import eye from "../../../Assets/eye.png";

//this component is the map for rendering the small recipe cards after a specific call is made for:
//all recipes public
//users favorites
//users private
//specific query
//with filters
//And renders the large recipe card when a specific recipe is clicked

class SmallRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLarge: false,
      recipe: []
    };
  }

  componentDidUpdate() {
    console.log(this.props);
  }
  //on mouse over makes a call for a single recipe to prepare to render on the large recipe card component
  getRecipe = i => {
    axios.get(`/recipes/id/${i}`).then(res => {
      this.setState({ recipe: res.data });
    });
  };

  //shows the large version of the recipe and sets the current recipe name and id for use on the planner
  toggleLarge = (id, name) => {
    this.setState({ showLarge: true });
    this.props.setCurrentRecipe(id, name);
  };

  //hides the large version of the recipe
  addToMealPlan = () => {
    this.setState({ showLarge: false });
    console.log(this.props.showPlanner);
    if (this.props.showPlanner === false) {
      this.props.togglePlanner();
    }
  };

  hideLarge = () => {
    this.setState({ showLarge: false });
  };

  deleteRecipe = id => {
    axios.delete(`/recipes/${id}`);
    axios.delete(`/users/favorites/${id}`, this.props.user);
    this.setState({ showLarge: false });
    this.props.deleteRecipeFromCurrent(id);
  };

  render() {
    const recipe = this.props.recipes.map((e, i) => {
      return (
        <div
          key={i}
          onMouseEnter={() => this.getRecipe(e.id)}
          className='small-recipe-card-polaroid'>
          <div className='small-recipe-card'>
            <div>
              <img
                src={e.imageURL}
                alt='recipe'
                className='small-recipe-card-image'
                onClick={() => this.toggleLarge(e.id, e.recipeName)}
              />
            </div>
            <div className='sm-recipe-buttons'>
              {this.props.user !== "" ? (
                <img
                  className='icons'
                  src={heart}
                  alt='Favorite'
                  onClick={() => this.props.addToFavorites(e.id)}
                />
              ) : null}
              <h3 className='recipe-name'>{e.recipeName}</h3>

              <img
                className='icons'
                src={eye}
                alt='view recipe'
                onClick={() => this.toggleLarge(e.id, e.recipeName)}
              />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='small-recipe-main'>
        <div className='small-recipe-card-holder'>{recipe}</div>
        <div>
          <LargeRecipe
            uid={this.props.user}
            recipe={this.state.recipe}
            addToFavorites={this.props.addToFavorites}
            showLarge={this.state.showLarge}
            hideLarge={this.hideLarge}
            addToMealPlan={this.addToMealPlan}
            deleteRecipe={this.deleteRecipe}
            togglePlanner={this.props.togglePlanner}
          />
        </div>
      </div>
    );
  }
}
export default SmallRecipe;
