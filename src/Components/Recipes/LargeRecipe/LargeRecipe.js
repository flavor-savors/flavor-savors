import React, { Component } from 'react';
import RecipeCreator from '../../RecipeCreator/RecipeCreator';

//this component is a modal over the small recipe cards 
//which displays after a specific recipe has been chosen to inspect

class LargeRecipe extends Component {
    constructor(){
        super()

        this.state={
            edit: false,
        }
    }


    render(){

        if(!this.props.showLarge){
            return null;
        }

        const showHideLarge = this.props.showLarge 
         ? 'large show-large'
         : 'large show-no-large'


         
        return(
            <div className = {showHideLarge} onClick={this.props.toggleLarge} >

                <div className='large-card'>
                    <h1>{this.props.recipe.recipeName}</h1>
                    <img src={this.props.recipe.imageURL} alt='recipe' className='lg-card-img'/>
                    <div>
                        {this.props.recipe.dietTags.map((e,i)=>{
                            return(
                                <div key={i}>{e}</div> 
                            )
                        })}
                    </div>
                    <div>
                        {this.props.recipe.ingredient.map((e,i)=>{
                            return(
                                <div key={i}>{e.amount} {e.name}</div> 
                            )
                        })}
                    </div>
                    <div>
                        {this.props.recipe.directions}
                    </div>

{/* button bar with conditional to show edit button if the logged in user is the creator of the recipe */}
                    <div>   
                        <button onClick={()=>this.props.addToFavorites(this.props.recipe.id)}>add to favs</button>
                        <button onClick={this.props.addToMealPlan}>Add to meal plan</button>
                        <button onClick={()=>this.props.hideLarge()}>Close</button>

                        {this.props.uid !== false && this.props.uid === this.props.recipe.user ? 
                            <div>
                            <button>Edit</button>
                            <button onClick={()=>this.props.deleteRecipe(this.props.recipe.id)}>Delete</button>
                            </div> 
                        : null
                        }

                    </div>  
                </div>
            
            
            
            






            </div>
        )
    }
}

export default LargeRecipe