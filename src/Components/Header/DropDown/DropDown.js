import React, { Component } from 'react'
import firebase from '../../firebase/firebase';
import {Link} from 'react-router-dom';


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
    return (
      <div>
        {/* <div className='x-drop-down' onClick={this.displayDrop}/> */}
        <img onClick={this.displayDrop} className='drop-img' src={firebase.auth().currentUser.photoURL} alt='profile'/>
        {/* <img src='https://www.iconsdb.com/icons/preview/white/arrow-216-xxl.png' className='s'/> */}
        <div className='downArrow'/>
        {this.state.showDrop ? 
        <div className='dp'>
        <div className='dp-items'>
        <Link className='pro-link' onClick={this.displayDrop} to='/profile'>profile</Link>
        <button className='logout' onClick={() => firebase.auth().signOut()}> sign out</button>
        </div>
        </div> : null}
      </div>
    )
  }
}

export default DropDown
