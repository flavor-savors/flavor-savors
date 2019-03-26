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
      
    }
    
    handleReg = () => {
      this.setState({showSign: false})
    }

  render() {
  
    return (
      <div>
      <div div className='sign-cont' onClick={this.props.x}/>
        <div className='sign-form'>
          <div className='tog'>
          <button className='btn-1' onClick={this.handleLog}>Login</button>
          <button className='btn-1' onClick={this.handleReg}>Register</button>
          </div>
          {this.state.showSign === true ? <SignIn/> : <Register/>}
        </div>
      </div>
    )
  }
}

export default Toggle