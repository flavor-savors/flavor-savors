import React, { Component } from 'react';
// import firebase from '../../firebase/firebase'
// import * as firebase from '../../../../server/firebase-key.json'
// import '../../../../server/firebase-key'
// import Register from '../Register/Register';
import SignIn from '../SignIn/SignIn'

class Toggle extends Component {
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

  render() {
  
    return (
      <div className='sign-cont'>
        <div className='sign-form' onClick={this.toggleBtns}>
        <p onClick={this.props.x}>x</p>
        <button disabled={this.state.disabled === "1"} id="1">log</button>
        <button disabled={this.state.disabled === "2"} id="2">reg</button>
        {this.state.disabled === "1" ? <SignIn/> :  null}
        </div>
      </div>
    )
  }
}

export default Toggle