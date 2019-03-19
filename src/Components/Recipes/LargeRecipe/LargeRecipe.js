import React, { Component } from 'react';
import axios from 'axios';


//this component will be a modal over the small recipe cards 
//after a specific recipe has been chosen to inspect

class LargeRecipe extends Component {
    constructor(){
        super()

        this.state ={
            recipe:[]
        }
    }

    componentDidMount(){
        axios.get(`/recipe/${this.props.currentRecipe}`).then(res=>{
            this.setState({recipes: res.data})
        })
    }

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
                <h1>placeholder text</h1>
                    <div >
                        {this.props.recipe}
                    </div>
                    <div>   
                        <button>add to favs</button>
                        <button>add to meal plan</button>
                    </div>  
                </div>

            </div>
        )
    }
}

export default LargeRecipe