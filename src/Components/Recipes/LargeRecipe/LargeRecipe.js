import React, { Component } from 'react';


//this component will be a modal over the small recipe cards 
//after a specific recipe has been chosen to inspect

class LargeRecipe extends Component {
    constructor(props){
        super(props)
    }



    componentDidMount(){
        // call for individual recipe based on id passed in from SmallRecipe, or could possibly be sent as a prop?
    }

    render(){
        if(!this.props.showLarge){
            return null;
        }

        const showHideClassname = this.props.showLarge 
         ? 'large showBlock'
         : 'large showNone' 
        return(
            <div className = {showHideClassname} >

                <div className='largeCard'>
                    <div onClick={this.props.toggleLarge}>
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