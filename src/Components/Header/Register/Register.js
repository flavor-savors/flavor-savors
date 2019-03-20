import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            cr8Eamil: '',
            cr8Pass: '',
            cr8Name: '',
            cr8Photo: '',
            info: []
        }
    }

    handleRegister = (e) => {
        e.preventDefault()
        const {cr8Eamil,cr8Pass,cr8Name,cr8Photo}=this.state
        axios
        .post('/register', {cr8Eamil,cr8Pass,cr8Name,cr8Photo})
        .then(response => {
            this.setState({info: response.data})
        })
    }

    handleRegInputs = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


  render() {
    return (
      <form onSubmit={(e) =>this.handleRegister(e)}>
          <input
            placeholder='Username'
            name='cr8Name'
            onChange={this.handleRegInputs}
          />
          <input
            placeholder='Email'
            name='cr8Email'
            onChange={this.handleRegInputs}
          />
          <input
            placeholder='Password'
            name='cr8Pass'
            onChange={this.handleRegInputs}
          />
          <input
            placeholder='Photo'
            name='cr8Photo'
            onChange={this.handleRegInputs}
          />
          <input type='submit' value='Submit'/>
      </form>
    )
  }
}

export default Register
