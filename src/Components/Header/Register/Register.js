import React, { Component } from 'react'

class Register extends Component {
    constructor(){
        super();
        this.state = {
            cr8Eamil: '',
            cr8Pass: '',
            cr8Name: '',
            cr8Photo: '',
        }
    }
  render() {
    return (
      <form>
          <input
            placeholder='Username'
            name='cr8Name'
          />
          <input
            placeholder='Email'
            name='cr8Email'
          />
          <input
            placeholder='Password'
            name='cr8Pass'
          />
          <input
            placeholder='Photo'
            name='cr8Photo'
          />
          <input type='submit' value='Submit'/>
      </form>
    )
  }
}

export default Register
