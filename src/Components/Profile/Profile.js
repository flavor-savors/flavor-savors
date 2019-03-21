import React, { Component } from 'react'
import './_profile.scss'
import firebase from '../firebase/firebase';
import ChangePassword from './ChangePassword/ChangePassword';
import {NavLink} from 'react-router-dom';
import RecipeCreator from '../RecipeCreator/RecipeCreator'
 
class Profile extends Component {
    constructor(){
      super();
      this.state ={
        isSignedin: false,
        changePass: false,
        cr8Rec: false
      }
    }

    componentDidMount(){
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedin: !!user})
    );
    }

    showChangePass = () => {
      this.setState({changePass: !this.state.changePass})
    }

    showRec = () => {
      this.setState({cr8Rec: !this.state.cr8Rec})
    }

    deleteAcc = () => {
      var user = firebase.auth().currentUser
      user.delete()
      .then(user => {

      }).catch(err => {
        console.log(err)
      })
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
            <button onClick={this.showChangePass}>Change Password</button>
            {this.state.changePass ?( <ChangePassword/>):(null)}
          </div>
        </div>

        <div className='recCrtr'>
          <div className='pro-recipe-input'>
            <button onClick={this.showRec}>input recipe</button>
    {this.state.cr8Rec ? <RecipeCreator/>: null}
          </div>
          <div className='profile-buttons'>
            <NavLink to='/home/favorites' className='pro-btn'>View Favorites</NavLink>
            <NavLink to='/home/myrecipes' className='pro-btn'>My Recipes</NavLink>
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
