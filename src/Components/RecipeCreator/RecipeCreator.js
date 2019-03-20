import React, { Component } from "react";
import axios from 'axios'

//this component is a modal over the user page to input a new recipe.

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
      public: true
    };
  }


  handleSubmit = e => {
    e.preventDefault()
    axios.post(`/recipes`, this.state)
  };

  handleChange = e => {
      if(['name', 'amount'].includes(e.target.className)){
          let ingredient = [...this.state.ingredient]
          ingredient[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ingredient}, ()=> console.log(this.state.ingredient))
      }else{
          this.setState({ [e.target.name]: e.target.value });
        }
        console.log(e.target.value)
  };

  addIngredient = (e) => {
      this.setState((prevState)=>({
          ingredient: [...prevState.ingredient, {name:"", amount:""}]
      }))
  }

  handleTags = e => {
    this.setState({
      ...this.state,
      dietTags: [...this.state.dietTags, e.target.value]
    });
    // console.log(this.state)
  };

  makePrivate = () => {
      this.setState({public: !this.state.public})
      console.log(this.state)
  }

  render() {
      let {ingredient} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="recipeForm">
          <fieldset>
            <legend>Create A Recipe</legend>

            <fieldset>
              Recipe Name:
              <input
                type="text"
                name="recipeName"
                value={this.state.recipeName}
                onChange={this.handleChange}
              />
              Recipe Image:
              <input
                type="url"
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
                          </div>
                      )
                  })
              }


            </fieldset>

            <fieldset>
              <legend>Directions:</legend>
              <textarea
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
              <input type="checkbox" name="public" value="false" onChange={this.makePrivate}/>
            </fieldset>
          </fieldset>
          <input type='submit' value = 'Submit'/>
        </form>
      </div>
    );
  }
}

export default RecipeCreator;





