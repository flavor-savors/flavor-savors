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
      <div className='sign-cont' onClick={this.props.x}/>
        <div className='sign-form'>
          <div className='tog'>
          <button className={this.state.showSign? 'btn-2': 'new-btn-1'} onClick={this.handleLog} >LOGIN</button>
          <button className={!this.state.showSign? 'btn-2': 'new-btn-2'} id='col-2' onClick={this.handleReg}>REGISTER</button>
          </div>
          {this.state.showSign === true ? <SignIn/> : <Register t={this.handleLog}/>}
        </div>
      </div>
    )
  }
}

export default Toggle