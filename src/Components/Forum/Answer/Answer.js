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
                <div key={i} className='replies-card'>
                    <div>{e.content}</div>
                </div>
            )
        })
        return(
            <div className={showHideReplies}>
                {replies}
                <button onClick={this.props.toggleReplies}>close</button>
            </div>
        )
    }
}

export default Answer