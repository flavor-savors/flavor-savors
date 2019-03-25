    import React, { Component } from 'react'
    import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
    import firebase from '../../firebase/firebase'
    
    export class SignIn extends Component {
        constructor(){
            super();
            this.state ={
                isSignedIn: false,
                logEmail: '',
                logPass: ''
            }
        }

        handleLogInputs = (e) => {
          this.setState({[e.target.name]: e.target.value})
        }

        handleLogin = (e) => {
          e.preventDefault();
          const {logEmail, logPass} =this.state;
          firebase.auth().signInWithEmailAndPassword(logEmail, logPass)
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
          signInSuccessUrl: 'http://localhost:3000/',
          // We will display Google and Facebook as auth providers.
          signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

          ],
          credentialHelper: 'none'
        };
    componentWillUnmount() {
        this.unregisterAuthObserver();
      }
    
    render() {
        // console.log(firebase.auth().currentUser)
        if (!this.state.isSignedIn) {
          return (
            <div className='new'>
              <h3 className='sm-log'>LOGIN</h3>
              {/* <p>Please sign-in:</p> */}
              <StyledFirebaseAuth  uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            
          );
        } else{return null}
      }
    }
    export default SignIn
    