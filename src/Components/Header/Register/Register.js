import React, { Component } from 'react'
import axios from 'axios';


const intialState ={
            email: '',
            password: '',
            displayName: '',
            photoURL: '',
            info: [],
            emailErr: '',
            passErr: '',
            nameErr: '',
            imgErr: ''
}

class Register extends Component {
    state = intialState;

    handleRegister = (e) => {
        e.preventDefault()
        const {email, password, displayName, photoURL}=this.state
        axios
        .post('/register', {email, password, displayName, photoURL})
        .then(response => {
            this.setState({info: response.data})
        })
        const isValid = this.validate();
        if(isValid){
          this.setState({intialState})
          this.props.t();
        }
    }

    handleRegInputs = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    validate = () => {
      let nameErr = '';
      let emailErr = '';
      let passErr = '';
      let imgErr = '';

      if(!this.state.email.includes('@')){
          emailErr = 'Invalid Email'
      }
      if(this.state.password.length < 6){
          passErr = 'Needs to be longer 6 characters'
      }
      if(!this.state.displayName){
          nameErr = "Name can't be empty"
      }
      if(!this.state.photoURL){
        imgErr = 'You need a profile image'
      }

      if(emailErr || passErr || nameErr || imgErr){
          this.setState({emailErr, passErr, nameErr, imgErr})
          return false
      }
      return true;
  }


  render() {
    return (
      <form onSubmit={(e) =>this.handleRegister(e)} className='reg-form'>
        <h3 className='reg-h3'>Register</h3>
          <input
            placeholder='Username'
            name='displayName'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <small className='reg-err'>{this.state.nameErr}</small>

          <input
            placeholder='Email'
            name='email'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <small className='reg-err'>{this.state.emailErr}</small>

          <input
            placeholder='Password'
            name='password'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <small className='reg-err'>{this.state.passErr}</small>

          <input
            placeholder='Photo'
            name='photoURL'
            onChange={this.handleRegInputs}
            className='reg-ipt'
          />
          <small className='reg-err'>{this.state.imgErr}</small>

          <button className='regsub' type='submit' value='Submit'>Submit</button>
      </form>
    )
  }
}

export default Register
