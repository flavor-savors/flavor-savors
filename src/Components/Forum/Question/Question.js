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

//on mouse over makes a call for a single recipe to prepare to render on the large recipe card component
    getQuestion = (i) => {
        axios.get(`/forum/${i}`).then(res=>{
        this.setState({question: res.data})
        console.log(this.state.question)
    })
}
    toggleReplies = () => {
        this.setState({showReplies: !this.state.showReplies})
    }

    render(){
        const question = this.props.questions.map((e, i)=>{
            return(
                <div key={i} onMouseEnter={()=>this.getQuestion(e.id)}>
                    <div>{e.content}</div>
                    <p>Posted by: {e.user}</p>
                    <button onClick={this.toggleReplies}>view replies</button>
{/* /needs a conditional render of a delete button if the questions uid matches the user uid */}
                </div>
            )
        })

        return(
            <div className='question-main'>
                <div>{question}</div>

                {!this.state.showReplies ? null
                    : <Answer
                    showReplies={this.state.showReplies}
                    question={this.state.question.content}
                    replies={this.state.question.replies}
                    toggleReplies = {this.toggleReplies}
                /> }


                
            </div>
        )
    }
}

export default Question