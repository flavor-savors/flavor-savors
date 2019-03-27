import React, { Component } from 'react'
import './_tutorial.scss'


class Tutorial extends Component {
  render() {
    return (
      <div className='tut-div'>
          <div className='tut-steps'> <p>browse recipes</p>
            <img className='gifs' src='https://media.giphy.com/media/APq4KTnluN8E6phP5U/giphy.gif' alt='vid'/>
          </div>
          <div className='tut-steps'> createna plan</div>
          <div className='tut-steps'> sign up and save plans</div>
      </div>
    )
  }
}

export default Tutorial
