import React, { Component } from 'react';
import Register from '../Register/Register';
import SignIn from '../SignIn/SignIn'

class Toggle extends Component {
    constructor(){
        super();
        this.state ={
            showSign: true
        }
    }

    handleLog = () => {
      this.setState({showSign: true})
      console.log('its true')
    }
    
    handleReg = () => {
      this.setState({showSign: false})
      console.log('its false')
    }

  render() {
  
    return (
      <div className='sign-cont'>
        <div className='sign-form'>
          <button onClick={this.props.x}>X</button>
          <button onClick={this.handleLog}>Login</button>
          <button onClick={this.handleReg}>Register</button>
          {this.state.showSign === true ? <SignIn/> : <Register/>}
        </div>
      </div>
    )
  }
}

export default Toggle