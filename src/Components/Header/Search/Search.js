import React, { Component } from 'react'

class Search extends Component {
    constructor(){
        super()
        this.state = {
            search: ''
        }
    }

    handleSearch = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    return (
     <form className='form-search'>
        <input
         placeholder='Search'
         name='search'
         onChange={this.handleSearch} 
         />
     </form>
    )
  }
}

export default Search
