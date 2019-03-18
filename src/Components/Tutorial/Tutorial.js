import React, { Component } from 'react'
import './_tutorial.scss'

class Tutorial extends Component {
  render() {
    return (
      <div className='tut-div'>
          <div className='tut-steps'> browse recipes</div>
          <div className='tut-steps'> createna plan</div>
          <div className='tut-steps'> sign up and save plans</div>
      </div>
    )
  }
}

export default Tutorial
