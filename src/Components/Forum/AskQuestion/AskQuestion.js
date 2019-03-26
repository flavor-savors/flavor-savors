import React, { Component } from 'react'
import axios from 'axios';


class AskQuestion extends Component {
    constructor(){
        super()

        this.state = {
            content:''
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

    submitQuestion = () => {
       axios.post(`/forum`,{uid: this.props.uid, content:this.state.content, username:this.props.username}).then(()=>
          this.props.getAll() 
       )
       this.setState({content: ''})
    }  

    render(){
        return(
            <div className="ask-question-main">
                <div>
                    <h1>Ask a Question:</h1>
                    <input type="text" name='content' value={this.state.content} onChange={this.handleChange}/>
                    <button onClick={this.submitQuestion}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AskQuestion