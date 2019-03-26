import React, { Component } from 'react'
import './_profile.scss'
import firebase from '../firebase/firebase';
import ChangeImage from './ChangeImage/ChangeImage';
import { Redirect} from 'react-router-dom';
import RecipeCreator from '../RecipeCreator/RecipeCreator'
 
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
        alert('Password Rest has been sent to your email.')
      }).catch(err => {
        console.log(err)
      })
    }


    // deleteAcc = () => {
    //   var user = firebase.auth().currentUser
    //   user.delete()
    //   .then(() => {
    //     console.log('deleted succsessfully')
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }


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
            {/* <button onClick={this.showRec}>input recipe</button>
    {this.state.cr8Rec ?<RecipeCreator/>: null} */}
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
