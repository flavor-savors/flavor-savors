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
            recipe: {}
        }
    }


    getRecipe = (i) => {
            axios.get(`/recipes/${i}`).then(res=>{
            this.setState({recipe: res.data})
        })
    }

    toggleLarge = (id, name) => {
        this.setState({showLarge: true})
        this.props.setCurrentRecipe(id, name)
    }

    hideLarge = () => {
        this.setState({showLarge: false})
    }

    render(){

// still need to clean up how to present all information.
        const recipe = this.props.recipes.map((e, i)=>{
            return(
                <div key={i} onMouseEnter={()=>this.getRecipe(e.id)} className='small-recipe-card'>
                    <div>
                        <div>
                            <h1>{e.recipeName}</h1>
                            <img src={e.imageURL} alt='recipe' className='small-recipe-card-image'/>
                        </div>
                        <div>   
                            <button onClick={this.props.addToFavorites}>add to favs</button>
                            <button onClick={()=>this.toggleLarge(e.id, e.recipeName)}>View this recipe</button>
                        </div>
                    </div>  
                </div>
            )
        })

        return(
            <div className='small-recipe-main'>
                <div className='small-recipe-card-holder'>
                    {recipe}
                </div>
                <div>
                    <LargeRecipe
                    recipe={this.state.recipe}
                    addToFavorites={this.props.addToFavorites}
                    showLarge={this.state.showLarge}
                    hideLarge={this.hideLarge}
                    togglePlanner={this.props.togglePlanner}
                    />
                </div>

            </div>
        )
    }
}
export default SmallRecipe;