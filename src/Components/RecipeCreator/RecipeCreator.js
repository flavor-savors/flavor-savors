import React, { Component } from 'react';

//this component is a modal over the user page to input a new recipe.

class RecipeCreator extends Component {
    constructor(){
        super()

        this.state={
            title:"",
            imgUrl:"",
            ingredients:[],
            directions:"",
            tags:[],
            public: true
        }
    }




    render(){
        return(
            <div>
                <form>


                    Recipe Name:
                    <input 
                    type="text"
                    value={this.state.title} />
                    
                    Recipe Image:
                    <input 
                    type="url"
                    value={this.state.imgUrl}/>

                    <fieldset>
                        <legend>Ingredients:</legend>
                        <div>
                            <input type="text" value={this.state.ingredients.amount}/>
                            <input type="text" value={this.state.ingredients.name}/>
                        </div>

                        {/* need to figure out the coding to add more fields  */}
                        

                    </fieldset>

                    Directions:
                    <input
                    type="text"
                    value={this.state.directions}/>

                    <fieldset>
                        <legend>Tags:</legend>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                        <input type="checkbox" name="tags" value="placeholder"/>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Make this recipe private?</legend>
                        <input type="checkbox" name="tags" value="Private"/>

                    </fieldset>




                </form>

            </div>
        )
    }
}

export default RecipeCreator