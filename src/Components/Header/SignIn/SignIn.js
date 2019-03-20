    import React, { Component } from 'react'
    import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
    import firebase from '../../firebase/firebase'
    
    export class SignIn extends Component {
        constructor(){
            super();
            this.state ={
                isSignedIn: false
            }
        }

        componentDidMount(){
            this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
                (user) => this.setState({isSignedIn: !!user})
            );
        }

       uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/signedIn',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    };

    // componentWillUnmount() {
    //     this.unregisterAuthObserver();
    //   }
    
    render() {
        console.log(this.state.isSignedIn)
        if (!this.state.isSignedIn) {
          return (
            <div>
              <h3>LOGIN</h3>
              <p>Please sign-in:</p>
              <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()}  uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
          );
        }
        return (
          <div>
            <h1>My App</h1>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          </div>
        );
      }
    }
    
    export default SignIn
    