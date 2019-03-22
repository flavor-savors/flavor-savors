import React, { Component } from 'react'
import firebase from '../../firebase/firebase';

class ChangePassword extends Component {
    constructor(){
        super();
        this.state = {
            newImage: ''
        }
    }

    updateImage = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
  
        user.updateProfile({
          photoURL: this.state.newImage
        }).then(() => {
          alert('s=sucessfully changed password')
        }).catch(err => {
          console.log(err)
        })
      }

      handleNewImg = (e) => {
          this.setState({[e.target.name]: e.target.value})
      }

  render() {
    return (
      <form onSubmit={(e) =>this.updateImage(e)}>
          <input
            placeholder='new img'
            onChange={this.handleNewImg}
            name='newImage'
          />
     
          <input type='submit' value='Submit'/>
      </form>
    )
  }
}

export default ChangePassword
