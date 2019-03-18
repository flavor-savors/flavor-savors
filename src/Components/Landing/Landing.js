import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import carousel/video component here


//This component is the landing page with links to:
//browse/search recipes 
//create meal plan
//view the tutorial page


class Landing extends Component {


    render(){
        return(
           <div>
               {/* video or carousel of images will be rendered here */}
                
{/* the div below holds the two main cards that link to Home with the planner either extended or hidden */}
                <div>
                    <Link to='/home'>
                    <div>View Recipes</div>
                    </Link>

                    <Link to='/home/build'>
                    <div>Build a plan</div>
                    </Link>
                </div>

{/* the div below holds the how to graphic  */}

                <Link to='/tutorial'>
                <div>
                    <div>step one</div>
                    <div>arrow</div>
                    <div>step two</div>
                    <div>arrow</div>
                    <div>step three</div>
                </div>
                </Link>

           </div> 
        )
    }
}

export default Landing