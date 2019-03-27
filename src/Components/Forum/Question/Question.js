import React, { Component } from 'react'
import Answer from '../Answer/Answer'
import axios from 'axios';


class Question extends Component {
    constructor(){
        super()

        this.state = {
            showReplies: false,
            question: [],
            newQuestionContent:''
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


//allows logged in users to delete their own replies
    deleteReply = (id) => {
        console.log(id)
        console.log(this.state.question.id)
        this.setState({showReplies: false})
        axios.delete(`/forum/reply/${this.state.question.id}`, id)
        .then(()=>
          this.getQuestion()
       )
    }

    render(){

        const question = this.props.questions.map((e, i)=>{
            return(
                <div key={i} onMouseEnter={()=>this.getQuestion(e.id)} className='question-card'>
                    
                        <div className='question-title'>
                            <button className='user-buttons' onClick={this.toggleReplies}>View replies</button>
                            <div>
                                <h2>{e.content}</h2>
                            </div>
                        </div>
                        <div className='user-buttons-name'>
                            <div className='username'>
                                <p>Posted by: {e.username}</p>
                            </div>
                            <button onClick={()=>this.props.deletePost(e.id)}>Delete</button>
                        </div>
                </div>
            )
        })

        return(
            <div className='question-main'>
                <div>{question}</div>

                {!this.state.showReplies ? null
                    : <Answer
                    uid={this.props.uid}
                    showReplies={this.state.showReplies}
                    question={this.state.question}
                    replies={this.state.question.replies}
                    toggleReplies = {this.toggleReplies}
                    deletePost={this.props.deletePost}
                    deleteReply={this.deleteReply}
                    getAll={this.props.getAll}
                /> }


                
            </div>
        )
    }
}

export default Question