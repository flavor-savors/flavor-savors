import React, { Component } from 'react';


//this component will be a modal over the small recipe cards 
//after a specific recipe has been chosen to inspect

class LargeRecipe extends Component {




    componentDidMount(){
        // call for individual recipe based on id passed in from SmallRecipe
    }

    render(){
        return(
            <div>
                {/* <img src={} alt="recipe image"/> */}
                <h1>recipe title</h1>
                <div>ingredients</div>    
                <div>tags</div>
                <div>directions</div> 

                <div>   
                    <button>add to favs</button>
                    <button>add to meal plan</button>
                </div>                   
            </div>
        )
    }
}

export default LargeRecipe