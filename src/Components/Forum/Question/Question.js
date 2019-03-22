import React, { Component } from 'react'
import Answer from '../Answer/Answer'
import axios from 'axios';


class Question extends Component {
    constructor(){
        super()

        this.state = {
            question:[],
            currentQuestion:0,
            showReplies: false
        }
    }

    componentDidMount(){
        axios.get(`/forum`).then(res=>{
            this.setState({question: res.data})
            console.log(res.data)
        })
    }

    setCurrentQuestion = (i) => {
        this.setState({currentQuestion: i})
    }

    toggleReplies = () => {
        this.setState({showReplies: !this.state.showReplies})
    }

    render(){
        const question = this.state.question.map((e, i)=>{
            return(
                <div key={i} onMouseEnter={()=>this.setCurrentQuestion(i)}>
                    <div>{e.content}</div>
                    <p>Posted by: {e.user}</p>
                    <button onClick={this.toggleReplies}>view replies</button>
                </div>
            )
        })
        return(
            <div className='question-main'>
                <div>{question}</div>

                {!this.state.showReplies ? null
                    : <Answer
                    showReplies={this.state.showReplies}
                    question={this.state.question[this.state.currentQuestion].content}
                    replies={this.state.question[this.state.currentQuestion].replies}
                    toggleReplies = {this.toggleReplies}
                /> }


                
            </div>
        )
    }
}

export default Question