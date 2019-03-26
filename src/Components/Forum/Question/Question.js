import React, { Component } from 'react'
import Answer from '../Answer/Answer'
import axios from 'axios';


class Question extends Component {
    constructor(){
        super()

        this.state = {
            showReplies: false,
            question: []
        }
    }

//on mouse over makes a call for a single question/answer to render on the answers component
    getQuestion = (i) => {
        axios.get(`/forum/${i}`).then(res=>{
        this.setState({question: res.data})
        })
    }

//opens and closes the replies to a question    
    toggleReplies = () => {
        this.setState({showReplies: !this.state.showReplies})
    }

//allows users to submit a question
    submitQuestion = () => {

    }    

//allows logged in users to delete their own posts
    deletePost = () => {
        axios.delete(`/forum/${this.state.question.id}`)
    }

//allows logged in users to delete their own replies

    deleteReply = (id) => {
        //needs endpoint
    }

    render(){
        const question = this.props.questions.map((e, i)=>{
            return(
                <div key={i} onMouseEnter={()=>this.getQuestion(e.id)} className='question-card'>
                    <div className='question-title'>
                    <button onClick={this.toggleReplies}>view replies</button>
                    <h1>{e.content}</h1>
                    </div>
                    {e.user}
                    <p>Posted by: {e.user}</p>
                    {this.props.uid === e.id ? 
                    <button>Delete</button>
                    : null}
                </div>
            )
        })

        return(
            <div className='question-main'>
                <div>{question}</div>

                {!this.state.showReplies ? null
                    : <Answer
                    user={this.props.uid}
                    showReplies={this.state.showReplies}
                    question={this.state.question.content}
                    replies={this.state.question.replies}
                    toggleReplies = {this.toggleReplies}
                    deleteReply={this.deleteReply}
                /> }


                
            </div>
        )
    }
}

export default Question