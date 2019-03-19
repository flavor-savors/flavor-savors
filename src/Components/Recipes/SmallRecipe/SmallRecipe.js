import React, {Component} from 'react';
import axios from 'axios';
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
            showLarge: false,
            recipes:[]
        }
    }

    componentDidMount(){
        axios.get(`/recipes/all`).then(res=>{
            this.setState({recipes: res.data})
        })
    }

    toggleLarge = () => {
        this.setState({showLarge: !this.state.showLarge})
        this.setState()
    }

    render(){


// still need to clean up how to present all information.
        const recipe = this.state.recipes.map((e, i)=>{
            return(
                
                <div key={i} onClick={this.toggleLarge}>
                    <h1>{e.recipeName}</h1>
                   { e.ingredient.map((e,i)=>{
                        return(
                            <div key={i}>{e.name} {e.amount}</div> 
                        )
                    })}
                    

                    <div>{e.dietTags[0]}</div>
                    <div>   
                         <button>add to favs</button>
                         <button onClick={this.props.togglePlanner}>add to meal plan</button>
                    </div>
                </div>  
                
            )
        })

        return(
            <div>
                <div>
                    {recipe}
                </div>
                <div>
                    {/* need to add code to pass individual id's to this component when user clicks */}
                    <LargeRecipe
                    showLarge={this.state.showLarge}
                    toggleLarge={this.toggleLarge}/>
                </div>

            </div>
        )
    }
}
export default SmallRecipe;