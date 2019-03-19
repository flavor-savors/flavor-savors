import React, { Component } from 'react';
import SmallRecipes from '../Recipes/SmallRecipe/SmallRecipe';
import Planner from '../PlannerDrawer/Planner';
import Filter from '../FilterDrawer/Filter';
import axios from 'axios';


//this component is the main home page for browsing/searching recipes and meal planning 
//it renders 5 views:

//default:
    //SmallRecipes (with specific call)
//based on url param to toggle planner to visible state:
    //SmallRecipes & Planner
//user based toggles:
    //SmallRecipes & Filter
    //SmallRecipes & Filter & Planner


class Home extends Component {
    constructor(){
        super()

        this.state = {
            showPlanner: false,
            showFilter: false,
            recipes:[]
        }
    }

    componentDidMount(){
            axios.get(`/recipes/all`).then(res=>{
                this.setState({recipes: res.data})
            })
    }

    togglePlanner = () =>{
        this.setState({showPlanner: !this.state.showPlanner})
        console.log(this.state)
    }
    toggleFilter = () =>{
        this.setState({showFilter: !this.state.showFilter})
    }



    render(){
        console.log(this.state.recipes)
        return(
            <div>
                {!this.state.filter ? null : <Filter/>}
                
                <SmallRecipes
                togglePlanner={this.togglePlanner}
                recipes={this.state.recipes}/>

                {!this.state.showPlanner ? null : <Planner/>}

               

            </div>
        )
    }
}

export default Home;