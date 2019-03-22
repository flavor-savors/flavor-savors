import React, { Component } from 'react';
import './_header.scss'
import Toggle from './Toggle/Toggle';
// import Search from './Search/Search';
import {Link} from 'react-router-dom';
import firebase from '../firebase/firebase';
import DropDown from './DropDown/DropDown';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      showSignIn: false,
      showSearch: false,
      signedIn: false,
      
    }
  }

  displaySignIn = () => {
    this.setState({showSignIn: !this.state.showSignIn})
  }

  displaySearch = () => {
    this.setState({showSearch: !this.state.showSearch})
  }

  componentDidMount(){
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({signedIn: !!user})
  );
  }


  render() {
    // console.log(firebase.auth().currentUser)
    return (
      <div className='header-div'>
        <div>
            <Link to='/' className='home-link'><h3>FLAVOR-SAVOR</h3></Link>
        </div>
        <div className='header-div-2'>
            <ul className='header-ul'>
                {/* {this.state.showSearch ?( <Search/>):(null)} */}
                <Link to='home'><li className='searchModal'>SEARCH</li></Link>
                <Link className='view-favs' to='/home/favorites'><li>VIEW FAVS</li></Link>
              {!this.state.signedIn? <li className='signInModal' onClick={this.displaySignIn}>SIGN IN</li>: <DropDown/>}  
                {this.state.showSignIn ?( <Toggle x={this.displaySignIn}/>):(null)}
            </ul>
        </div>
      </div>
    )
  }
}

export default Header
