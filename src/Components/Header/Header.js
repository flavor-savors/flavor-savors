import React, { Component } from 'react';
import './_header.scss'
import SignIn from './SignIn/SignIn';
import Search from './Search/Search';
import {Link} from 'react-router-dom'

class Header extends Component {
  constructor(){
    super();
    this.state = {
      showSignIn: false,
      showSearch: false
    }
  }

  displaySignIn = () => {
    this.setState({showSignIn: !this.state.showSignIn})
  }

  displaySearch = () => {
    this.setState({showSearch: !this.state.showSearch})
  }


  render() {
    return (
      <div className='header-div'>
        <div>
            <Link to='/' className='home-link'><h3>FLAVOR-SAVOR</h3></Link>
        </div>
        <div className='header-div-2'>
            <ul className='header-ul'>
                {this.state.showSearch ?( <Search/>):(null)}
                <li onClick={this.displaySearch} className='searchModal'>SEARCH</li>
                <li>VIEW FAVS</li>
                <li className='signInModal' onClick={this.displaySignIn}>SIGN IN</li>
                {this.state.showSignIn ?( <SignIn x={this.displaySignIn}/>):(null)}
            </ul>
        </div>
      </div>
    )
  }
}

export default Header
