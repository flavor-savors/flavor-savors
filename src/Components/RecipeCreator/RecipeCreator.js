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
    
    console.log(this.props.recipe)
    if(this.props.recipe){
    let recipe = this.props.recipe

    this.setState({
      recipeName: recipe.recipeName,
      imageURL: JSON.stringify(recipe.imageURL),
      ingredient: recipe.ingredient,
      directions: recipe.directions,
      dietTags: recipe.dietTags,
      public: recipe.public,
      uid: recipe.user
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
    axios.put(`/recipes/${this.props.recipe.id}`, state).then(res=>{
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
     
        <form onSubmit={this.handleSubmit} className="recipeForm">

          <main className='rec-out'>
            <legend>Edit Your Recipe</legend>

            <div className='Cr8-1'>
            <small>Recipe Name:</small>
              <input
                type="text"
                name="recipeName"
                className='recipe-name'
                value={this.state.recipeName}
                onChange={this.handleChange}
                required
              />
              <small>Recipe Image:</small>
              <input
                type="text"
                className='recipe-img'
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.handleChange}
                required
              />
            </div>
          
            <div className='Cr8-2'>
              <legend>Directions:</legend>
              <textarea 
                className='cr8-2-area'
                type="text"
                name="directions"
                value={this.state.directions}
                onChange={this.handleChange}
                required
              />
            </div>

            <fieldset className='rec-tags'>
              <legend>Tags:</legend>
              <input className='tag' type="checkbox" name="dietTags" value="breakfast" id="breakfast" onClick={this.handleTags}/>
              <label className='tag' htmlFor="breakfast">Breakfast</label>
              <input className='tag' type="checkbox" name="dietTags" value="lunch" id='lunch' onClick={this.handleTags}/>
              <label className='tag' htmlFor="lunch">Lunch</label>
              <input className='tag' type="checkbox" name="dietTags" value="dinner" id='dinner' onClick={this.handleTags}/>
              <label className='tag' htmlFor="dinner">Dinner</label>
              <input className='tag' type="checkbox" name="dietTags" value="dessert" id='dessert' onClick={this.handleTags}/>
              <label className='tag' htmlFor="dessert">Dessert</label>
              <input className='tag' type="checkbox" name="dietTags" value="snack" id='snack' onClick={this.handleTags}/>
              <label className='tag' htmlFor="snack">Snack</label>
              <input className='tag' type="checkbox" name="dietTags" value="vegetarian" id='vegetarian' onClick={this.handleTags}/>
              <label className='tag' htmlFor="vegetarian">Vegetarian</label>
              <input className='tag' type="checkbox" name="dietTags" value="vegan" id='vegan' onClick={this.handleTags}/>
              <label className='tag' htmlFor="vegan">Vegan</label>
              <input className='tag' type="checkbox" name="dietTags" value="paleo" id='paleo' onClick={this.handleTags}/>
              <label className='tag' htmlFor="paleo">Paleo</label>
            </fieldset>

            <fieldset>
              <legend>Make this recipe private?</legend>
              <input type="checkbox" name="public" value={this.state.public ? "true" : "false"} onChange={this.makePrivate}/>
            </fieldset>
              </main>

            <fieldset className='two'>
              <legend>Ingredients:</legend>
              <button className='rec-add' onClick={this.addIngredient}>Add another ingredient</button>

              {
                  ingredient.map((val, id)=>{
                      let nameId = `ingredient${id}`, amtId = `amount${id}`
                      return(
                          <div className='add-ing' key = {id}>
                            <label htmlFor={nameId}>
                            Name:
                            <input
                                className='rec-ing-input'
                                type='text'
                                name={nameId}
                                data-id={id}
                                id = {nameId}
                                className='name'
                                value={ingredient[id].name}
                                onChange={this.handleChange}
                                required
                            />
                            </label>

                            <label htmlFor={amtId}>
                            Amount:
                            <input
                                className='rec-ing-input'
                                type='text'
                                name={amtId}
                                data-id={id}
                                id={amtId}
                                className='amount'
                                value={ingredient[id].amount}
                                onChange={this.handleChange}
                                required
                            />
                            </label>
                            <button className='rec-ing-delete' type='button' onClick={()=>this.deleteIngredient(id)}>X</button>
                          </div>
                      )
                  })
              }
            <input  className='sub-rec'type='submit' value = 'Submit'/> 
            </fieldset>


          {this.props.recipe ? 
          <button  onClick={this.props.toggleEdit}>Close</button>
          : null}
          
        </form>
    );
  }
}


export default RecipeCreator;





