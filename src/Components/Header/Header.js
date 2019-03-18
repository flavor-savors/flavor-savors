import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className='header-div'>
        <div>
            <h3>FLAVOR-SAVOR</h3>
        </div>
        <div className='header-div-2'>
            <ul className='header-ul'>
                <li>SEARCH</li>
                <li>VIEW FAVS</li>
                <li>SIGN IN</li>
            </ul>
        </div>
      </div>
    )
  }
}

export default Header
