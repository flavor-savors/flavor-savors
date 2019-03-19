import React, { Component } from 'react'

class SignIn extends Component {
    constructor(){
        super();
        this.state ={
            login: true
        }
    }

    submit = (e) => {
        e.preventDefault();

        this.state.login
        //this is where your login axios call goes
        ? console.log('Login')
        //this is where your register axios call gors
        : console.log('Register')
    }

  render() {
    return (
      <div className='sign-cont'>
        <form className='sign-form' onSubmit={this.submit}>
            <button onClick={this.props.x}>X</button>
           <div className='sign-inputs'>
            <input 
            className='sign-input'
            placeholder='username'
            />
            <input 
            className='sign-input'
            placeholder='password'
            />
            <button>{this.state.login ? 'Login': 'Register'}</button>
           </div> 
        <p>Dont have an account</p>
        <button onClick={() => this.setState({login: !this.state.login})}>{this.state.login ? 'Login': 'Register'}</button>
        </form>
      </div>
    )
  }
}

export default SignIn