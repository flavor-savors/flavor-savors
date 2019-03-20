import React, { Component } from 'react'


class Answer extends Component {

    componentDidMount(){
        console.log(this.props.replies)
    }

    render(){
        if(!this.props.showReplies){
            return null;
        }

        const showHideReplies = this.props.showReplies
        ? 'replies show-replies'
        : 'replies show-no-replies'
        
        const replies = this.props.replies.map((e, i)=>{
            return(
                <div key={i} >
                    <div>{e.content}</div>
                </div>
            )
        })
        return(
            <div className={showHideReplies}>

                <div className='replies-card'>
                    <h1>{this.props.question}</h1>
                    <div>{replies}</div>
                    <button onClick={this.props.toggleReplies}>close</button>
                </div>

            </div>
        )
    }
}

export default Answer