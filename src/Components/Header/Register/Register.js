import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            displayName: '',
            photoURL: '',
            info: []
        }
    }

    handleRegister = (e) => {
        e.preventDefault()
        const {email, password, displayName, photoURL}=this.state
        axios
        .post('/register', {email, password, displayName, photoURL})
        .then(response => {
            this.setState({info: response.data})
        })
    }

    handleRegInputs = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


  render() {
    return (
      <form onSubmit={(e) =>this.handleRegister(e)} className='reg-form'>
          <input
            placeholder='Username'
            name='displayName'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <input
            placeholder='Email'
            name='email'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <input
            placeholder='Password'
            name='password'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <input
            placeholder='Photo'
            name='photoURL'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <button className='regsub' type='submit' value='Submit'>Submit</button>
      </form>
    )
  }
}

export default Register
