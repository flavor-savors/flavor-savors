import React, { Component } from 'react';
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
        <button className='btn-null' onClick={this.displaySearch}></button>
        <div>
            <Link to='/' className='home-link'><h3>FLAVOR-SAVOR</h3></Link>
        </div>
        <div className='header-div-2'>
            <ul className='header-ul'>

              <Link to='/forum' className='searchModal'><li>FORUM</li></Link> 
              <Link to='/home' className='l-browse'><li>BROWSE</li></Link>
              {!this.state.signedIn? <div className="tooltip"> <li className='view-favs'>VIEW FAVS</li>
                <small className="tooltiptext">You need to be signed in</small>
              </div> : <Link className='view-favs' to='/home/favorites'><li>VIEW FAVS</li></Link>}
              {!this.state.signedIn? <li className='signInModal' onClick={this.displaySignIn}>SIGN IN</li>: <DropDown/>}  
                {this.state.showSignIn ?( <Toggle x={this.displaySignIn}/>):(null)}
            </ul>
        </div>
      </div>
    )
  }
}

export default Header