import React, { Component } from 'react'
import firebase from '../../firebase/firebase';
import {NavLink, Redirect} from 'react-router-dom';

class DropDown extends Component {
    constructor(){
        super();
        this.state = {
            showDrop: false,
            inUse: false
        }
    }

    displayDrop = () => {
        this.setState({showDrop: !this.state.showDrop})
      }

    componentDidMount(){
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({inUse: !!user})
        );
    }  


  render() {
    //   if(this.state.inUse){
    //     return <Redirect push to='/'/>
    //   }
    //   console.log(firebase.auth())
    return (
      <div>
        <img onClick={this.displayDrop} className='drop-img' src={firebase.auth().currentUser.photoURL} alt='profile'/>
        <div className='downArrow'/>
        {this.state.showDrop ? 
        <div className='dp'>
        <NavLink onClick={this.displayDrop} to='/profile'>Profile</NavLink>
        <button onClick={() => firebase.auth().signOut()}> sign out</button>
        </div> : null}
      </div>
    )
  }
}

export default DropDown
