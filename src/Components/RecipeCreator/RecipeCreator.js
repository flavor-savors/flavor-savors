import React, { Component } from "react";
import axios from 'axios'
import firebase from "../firebase/firebase";


//this component is a modal over the user admin page to input a new recipe 
//and rendered in LargeRecipe as an edit component

class RecipeCreator extends Component {
  constructor() {
    super();

    this.state = {
      recipeName: "",
      imageURL: "",
      ingredient: [{
        name: "",
        amount: ""
      }],
      directions: "",
      dietTags: [],
      public: true,
      addons: [],
      user: ""
     };
  }

//sets up for user verification
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user !== null){
        this.setState({ user: user.uid });
      }
    });
    

    if(this.props.recipe){
    let recipe = this.props.recipe

    this.setState({
      recipeName: recipe.recipeName,
      imageURL: JSON.stringify(recipe.imageURL),
      ingredient: recipe.ingredient,
      directions: recipe.directions,
      dietTags: recipe.dietTags,
      public: recipe.public,
      user: recipe.user
    })
  }
  }

//submits the new recipe or submits an update to current recipe and resets the form by resetting state
  handleSubmit = (e) => {
    e.preventDefault()
   console.log(this.state)
const state = this.state
   if(this.props.recipe){
    this.props.toggleEdit()
    axios.put(`recipes/${this.props.recipe.id}`, state).then(res=>{
      console.log(res)
    })
   }else{
    axios.post(`/recipes`, state).then(res=>{
      console.log(res)
      })  
   }
  
    this.setState({
      recipeName: "",
      imageURL: "",
      ingredient: [{
        name: "",
        amount: ""
      }],
      directions: "",
      dietTags: [],
      public: true,
      user:''
    })
  };

//handles all input changes
  handleChange = (e) => {
      if(['name', 'amount'].includes(e.target.className)){
          let ingredient = [...this.state.ingredient]
          ingredient[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ingredient})
      }else{
          this.setState({ [e.target.name]: e.target.value });
        }
  };

//adds another ingredient object to state
  addIngredient = (e) => {
    e.preventDefault()
      this.setState((prevState)=>({
          ingredient: [...prevState.ingredient, {name:"", amount:""}]
      }))
  }

//removes an ingredient object
  deleteIngredient = (id) => {
    let ingredients = this.state.ingredient
    ingredients.splice(id, 1);
    this.setState({ingredient: ingredients})
    console.log(id)
  }

//adds tags to the recipe 
  handleTags = e => {
    this.setState({
      ...this.state,
      dietTags: [...this.state.dietTags, e.target.value]
    });
  };

//allows user to make a recipe private  
  makePrivate = () => {
      this.setState({public: !this.state.public})
      console.log(this.state)
  }

  render() {
      let {ingredient} = this.state
    return (
      <div >
        <form onSubmit={this.handleSubmit} className="recipeForm">
          <fieldset className=''>
            <legend>Edit Your Recipe</legend>

            <fieldset className=''>
              <small>Recipe Name:</small>
              <input
                type="text"
                name="recipeName"
                value={this.state.recipeName}
                onChange={this.handleChange}
              />
              Recipe Image:
              <input
                type="text"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.handleChange}
              />
            </fieldset>

            <fieldset>
              <legend>Ingredients:</legend>
              <button onClick={this.addIngredient}>Add another ingredient</button>

              {
                  ingredient.map((val, id)=>{
                      let nameId = `ingredient${id}`, amtId = `amount${id}`
                      return(
                          <div key = {id}>
                            <label htmlFor={nameId}>
                            Name:
                            <input
                                type='text'
                                name={nameId}
                                data-id={id}
                                id = {nameId}
                                className='name'
                                value={ingredient[id].name}
                                onChange={this.handleChange}
                            />
                            </label>

                            <label htmlFor={amtId}>
                            Amount:
                            <input
                                type='text'
                                name={amtId}
                                data-id={id}
                                id={amtId}
                                className='amount'
                                value={ingredient[id].amount}
                                onChange={this.handleChange}
                            />
                            </label>
                            <button type='button' onClick={()=>this.deleteIngredient(id)}>X</button>
                          </div>
                      )
                  })
              }
            </fieldset>

            <fieldset>
              <legend>Directions:</legend>
              <textarea className='directions'
                type="text"
                name="directions"
                value={this.state.directions}
                onChange={this.handleChange}
              />
            </fieldset>

            <fieldset>
              <legend>Tags:</legend>
              <input type="checkbox" name="dietTags" value="breakfast" id="breakfast" onClick={this.handleTags}/>
              <label htmlFor="breakfast">Breakfast</label>
              <input type="checkbox" name="dietTags" value="lunch" id='lunch' onClick={this.handleTags}/>
              <label htmlFor="lunch">Lunch</label>
              <input type="checkbox" name="dietTags" value="dinner" id='dinner' onClick={this.handleTags}/>
              <label htmlFor="dinner">Dinner</label>
              <input type="checkbox" name="dietTags" value="dessert" id='dessert' onClick={this.handleTags}/>
              <label htmlFor="dessert">Dessert</label>
              <input type="checkbox" name="dietTags" value="snack" id='snack' onClick={this.handleTags}/>
              <label htmlFor="snack">Snack</label>
              <input type="checkbox" name="dietTags" value="vegetarian" id='vegetarian' onClick={this.handleTags}/>
              <label htmlFor="vegetarian">Vegetarian</label>
              <input type="checkbox" name="dietTags" value="vegan" id='vegan' onClick={this.handleTags}/>
              <label htmlFor="vegan">Vegan</label>
              <input type="checkbox" name="dietTags" value="paleo" id='paleo' onClick={this.handleTags}/>
              <label htmlFor="paleo">Paleo</label>
            </fieldset>

            <fieldset>
              <legend>Make this recipe private?</legend>
              <input type="checkbox" name="public" value={this.state.public ? "true" : "false"} onChange={this.makePrivate}/>
            </fieldset>
          </fieldset>
          {this.props.recipe ? 
          <button onClick={this.props.toggleEdit}>Close</button>
          : null}
          <input type='submit' value = 'Submit'/> 
          
        </form>
      </div>
    );
  }
}


export default RecipeCreator;





