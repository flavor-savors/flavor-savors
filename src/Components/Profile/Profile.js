import React, { Component } from 'react'
import './_profile.scss'
import firebase from '../firebase/firebase';
import ChangeImage from './ChangeImage/ChangeImage';
import { Redirect} from 'react-router-dom';
import RecipeCreator from '../RecipeCreator/RecipeCreator';
import swal from '@sweetalert/with-react';

 
class Profile extends Component {
    constructor(){
      super();
      this.state ={
        changeImg: false,
        cr8Rec: false,
        user: {}
      }
    }

    componentDidMount(){
      this.authListener()
    }

    authListener = () => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.setState({user})
        } else {
          this.setState({user: null})
        }
      })
    }

    showRec = () => {
      this.setState({cr8Rec: !this.state.cr8Rec})
    }

    showChangePass = () => {
      this.setState({changePass: !this.state.changePass})
    }

    showChangeImg = () => {
      this.setState({changeImg: !this.state.changeImg})
    }

    resetPass = () => {
      var auth = firebase.auth();
      
      auth.sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        swal({
          title: "Email Sent",
          text: "you will an recive email to rest your password!",
          icon: "success"
        });
      }).catch(err => {
        console.log(err)
      })
    }


    deleteAcc = () => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover your profile",
          icon: "warning",
          buttons: true,
          dangerMode: true
        })
        .then(user1 => {
          if(user1){
            var user = firebase.auth().currentUser
            user.delete()
            swal("Poof! Your account has been deleted!",{
              icon: "success",
            })
          } else {
            swal("Your account is safe!");
          }
        })
    }


  render() {
    // console.log(this.state.user)
    if(!firebase.auth().currentUser){
      return <Redirect push to='/'/>
    }
    // console.log(firebase.auth().currentUser.uid)
    if(this.state.user){
    return (
      <div className='prof-cont'>
        <div className='pro-info'>
          <img className='pro-img' src={firebase.auth().currentUser.photoURL} alt='profile'/>
          <div className='user-info'>
            <h3>{firebase.auth().currentUser.displayName}</h3>
            <button className='pro-btns' onClick={this.resetPass}>Change Password</button>
            <button className='pro-btns' onClick={this.deleteAcc}>acc Delete</button>
            <button className='pro-btns' onClick={this.showChangeImg}>change Img</button>
            {this.state.changeImg ?( <ChangeImage/>):(null)}
          </div>
        </div>

        <div className='recCrtr'>
          <div className='pro-recipe-input'>
            <RecipeCreator/>
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
