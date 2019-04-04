import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';



//This component is the landing page with links to:
//browse/search recipes 
//create meal plan
//view the tutorial page


class Landing extends Component {


    render(){
        return(
           <div>
               <Carousel/>
                
{/* the div below holds the two main cards that link to Home with the planner either extended or hidden */}
                <div className='main-landing'>
                    <div className='box-1'>
                        <div className='div-1'>
                            <Link className='land-link' to='/home'>
                            <h1 className='land-title'>View Recipes</h1>
                            </Link>
                        </div>
                       
                        <div className='div-2'>
                            <Link className='land-link' to='/home/build'>
                             <h1 className='land-title'>Build a plan</h1>
                             </Link>
                        </div>
                    </div>

    {/* the div below holds the how to graphic  */}

                    
                    <div className='box-2'>
                        <div className='div-3'>
                        <Link className='land-step' to='/tutorial'>
                        <h4 className='land-sq'>Step One</h4>
                        </Link>
                        </div>
                        <img className='arrow' src='https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png'/>
                        <div className='div-4'>
                        <Link className='land-step' to='/tutorial'>
                        <h4 className='land-sq'>Step Two</h4>
                        </Link>
                        </div>
                        <img className='arrow' src='https://www.freeiconspng.com/uploads/white-arrow-transparent-png-22.png'/>

                        <div className='div-5'>
                        <Link className='land-step' to='/tutorial'>
                        <h4 className='land-sq'>Step Three</h4>
                        </Link>
                        </div>

                    </div>
                    
                </div>
           </div> 
        )
    }
}

export default Landing