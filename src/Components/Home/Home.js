import React, { Component } from 'react';
import SmallRecipes from '../Recipes/SmallRecipe/SmallRecipe';
import Planner from '../PlannerDrawer/Planner';
import Filter from '../FilterDrawer/Filter';


//this component is the main home page for browsing/searching recipes and meal planning 
// it renders 5 views:

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
            planner: false,
            filter: false
        }
    }

    componentDidMount(){
        //if url has builder in it toggle the planner state to true
    }

    togglePlanner = () =>{
        this.setState({planner: !this.state.planner})
    }
    toggleFilter = () =>{
        this.setState({filter: !this.state.filter})
    }



    render(){
        return(
            <div>
                {!this.state.filterShow ? null : <Filter/>}
                
                <SmallRecipes
                togglePlanner={this.togglePlanner}/>

                {!this.state.plannerShow ? null : <Planner/>}

               

            </div>
        )
    }
}

export default Home;