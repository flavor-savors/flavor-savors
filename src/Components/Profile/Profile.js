import React, { Component } from 'react'
import './_profile.scss'

class Profile extends Component {
  render() {
    return (
      <div className='prof-cont'>
        <div className='pro-info'>
          <img className='pro-img' src='https://via.placeholder.com/300/09f/fff.pngC/O https://placeholder.com/' alt='profile'/>
          <div className='user-info'>

          </div>
        </div>

        <div className='recCrtr'>
          <div className='profile-buttons'>
            <button>View Favorites</button>
            <button>My Recipes</button>
            <button> My Plans</button>
            <button> View Forum</button>
          </div>
        </div>
      </div>     
    )
  }
}

export default Profile
