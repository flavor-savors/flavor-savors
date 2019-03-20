import React, { Component } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from '../../firebase/firebase'
// import * as firebase from '../../../../server/firebase-key.json'
// import '../../../../server/firebase-key'
import Register from '../Register/Register'

class SignIn extends Component {
    constructor(){
        super();
        this.state ={
            disabled: "1",
        }
    }

   toggleBtns = (e) => {
     const id = e.target.id;
     this.setState({disabled: id});
    }

    // const config = {
    //   apiKey: 'AIzaSyBQepnVXCgQ465z776VZlufZ_PIroQ3N3g',
    //   authDomain: 'offtherecord-2a9df.firebaseapp.com',
    //   databaseURL: 'https://offtherecord-2a9df.firebaseio.com',
    //   projectId: 'offtherecord-2a9df',
    //   storageBucket: 'offtherecord-2a9df.appspot.com',
    //   messagingSenderId: '369344354436'
    // };
    
    // firebase.initializeApp(config);

    //   uiConfig = {
    //   // Popup signin flow rather than redirect flow.
    //   signInFlow: 'popup',
    //   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    //   signInSuccessUrl: '/signedIn',
    //   // We will display Google and Facebook as auth providers.
    //   signInOptions: [
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.auth.FacebookAuthProvider.PROVIDER_ID
    //   ]
    // };

  render() {
  
    return (
      <div className='sign-cont'>
        <div className='sign-form' onClick={this.toggleBtns}>
        <button disabled={this.state.disabled === "1"} id="1">log</button>
        <button disabled={this.state.disabled === "2"} id="2">reg</button>
        {this.state.disabled === "1" ? <p>login</p> : <Register/>}
        </div>
      </div>
    )
  }
}

export default SignIn