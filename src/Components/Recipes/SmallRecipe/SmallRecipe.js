import React, {Component} from 'react';
import LargeRecipe from '../LargeRecipe/LargeRecipe';

//this component is the map for rendering the small recipe cards after a specific call is made for:
    //all recipes public
    //users favorites
    //users private
    //specific query
    //with filters
//And renders the large recipe card when a specific recipe is clicked 


class SmallRecipe extends Component {
    constructor(props){
        super(props)

        this.state ={
            largeRecipe: false
        }
    }

    render(){


        // const recipes = placeholderArray.map((e, i)=>{
        //     return(
        //         <Link>
                // <div key={i} style={background-image:{e.image}}>
                //     <h1>{e.title}</h1>
                //     <div>{e.ingredients}</div>    
                //     <div>{e.tags}</div>
                //     <div>   
                //          <button>add to favs</button>
                //          <button onClick={this.props.togglePlanner}>add to meal plan</button>
                //     </div>
                // </div>  
        //         </Link>              
        //     )
        // })

        return(
            <div>
                {!this.state.largeRecipeShow ? 
                    null : 
                    //need to add code to pass individual id's to this component when user clicks
                    <LargeRecipe/> }
                
                {/* {recipes} */}
                {/* the following is placeholder code until functionality is established */}
                <div>
                    <h1>title</h1>
                    <div>ingredients</div>    
                    <div>tags</div>
                    <div>   
                         <button>add to favs</button>
                         <button onClick={this.props.togglePlanner}>add to meal plan</button>
                    </div>
                </div>  
            </div>
        )
    }
}
export default SmallRecipe;