import React, { Component } from 'react';

//this component is a modal over the small recipe cards 
//which displays after a specific recipe has been chosen to inspect

class LargeRecipe extends Component {

    render(){
        if(!this.props.showLarge){
            return null;
        }

        const showHideClassname = this.props.showLarge 
         ? 'large showBlock'
         : 'large showNone' 
        return(
            <div className = {showHideClassname} onClick={this.props.toggleLarge} >

                <div className='largeCard'>
                <h1>{this.props.recipe.recipeName}</h1>
                <img src={this.props.imageURL}/>
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
                    <div>   
                        <button>add to favs</button>
                        <button onClick={()=>this.props.togglePlanner(true)}>add to meal plan</button>
                    </div>  
                </div>

            </div>
        )
    }
}

export default LargeRecipe