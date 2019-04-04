import React from 'react'
import rightArrow from '../../Assets/rightArrow.png'

const Tutorial = () => {
  return (
    <div className='background'>

    
    <div className='tut-div'>
    <div className='tut-steps-1'> 

        <div className='gif-div'>
          <h2 className='tut-title'>browse recipes</h2>
          <img className='gifs' src='https://media.giphy.com/media/APq4KTnluN8E6phP5U/giphy.gif' alt='vid'/>
        </div>

      <div className='tut-des'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
    </div>
    <img src={rightArrow} className='hello'/>


    <div className='tut-steps-2'>
        <div className='gif-div'>

          <h2 className='tut-title'>Create a plan</h2>
          <img className='gifs' src='https://media0.giphy.com/media/oS2vhP1r9Ssyk/giphy.gif?cid=790b76115c9e73bb4b4c6d6151fa7890' alt='vid'/>
        </div>

      <div className='tut-des'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>

    <img src={rightArrow} className='hello'/>

    <div className='tut-steps-3'>
    <div className='gif-div'>
          <h2 className='tut-title'>Sign up and save plans</h2>
          <img className='gifs' src='https://media.giphy.com/media/APq4KTnluN8E6phP5U/giphy.gif' alt='vid'/>
        </div>

      <div className='tut-des'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
</div>


</div>
  )
}

export default Tutorial
