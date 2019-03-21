import React, { Component } from 'react'
import './_profile.scss'
import firebase from '../firebase/firebase';

class Profile extends Component {
    constructor(){
      super();
      this.state ={
        isSignedin: false
      }
    }

    componentDidMount(){
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedin: !!user})
    );
    }


  render() {
    console.log(firebase.auth().currentUser)
    if(this.state.isSignedin){
    return (
      <div className='prof-cont'>
        <div className='pro-info'>
          <img className='pro-img' src={firebase.auth().currentUser.photoURL} alt='profile'/>
          <div className='user-info'>
            <p>{firebase.auth().currentUser.displayName}</p>
          </div>
        </div>

        <div className='recCrtr'>
          <div className='pro-recipe-input'>
            <p>input recipe</p>
          </div>
          <div className='profile-buttons'>
            <button className='pro-btn'>View Favorites</button>
            <button className='pro-btn'>My Recipes</button>
            <button className='pro-btn'> My Plans</button>
            <button className='pro-btn'> View Forum</button>
          </div>
        </div>
      </div>     
    )
    } else{
      return null
    }
  }
}

export default Profile
