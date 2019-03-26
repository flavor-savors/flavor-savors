import React, { Component } from "react";
import axios from "axios";

class Answer extends Component {
  constructor() {
    super();

    this.state = {
      newReplyContent: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitReply = () => {
    axios.post(`/forum/reply/${this.props.question.id}`, {
      content: this.state.newReplyContent,
      uid: this.props.uid,
      username: this.props.question.username
    });
    this.props.toggleReplies()
  };

  render() {
    if (!this.props.showReplies) {
      return null;
    }

    const showHideReplies = this.props.showReplies
      ? "replies show-replies"
      : "replies show-no-replies";

    const replies = this.props.replies.map((e, i) => {
      return (
        <div key={i}>
          <div>{e.content}</div>
          {this.props.replies.id === this.props.user ? (
            <button onClick={() => this.props.deleteReply(e.id)}>Delete</button>
          ) : null}
        </div>
      );
    });

    return (
      <div className={showHideReplies}>
        <div className='replies-card'>
          <h1>{this.props.question.content}</h1>
          <div className='forum-button-bar'>
            {this.props.uid !== "" ? (
              <div className='replies-buttons'>
                <input
                  type='text'
                  name='newReplyContent'
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <button className='reply-button' onClick={this.submitReply}>
                  Reply
                </button>
                <button onClick={this.props.toggleReplies}>close</button>
              </div>
            ) : (
              <div className='reply-modal'>
                <button className='reply-modal'>Reply</button>
                <p className='reply-text'>Must be Signed in to reply</p>
                <button onClick={this.props.toggleReplies}>close</button>
              </div>
            )}
            {/* <button onClick={this.props.toggleReplies}>close</button> */}
          </div>
          {!this.props.replies.length ? (
            <p>No replies</p>
          ) : (
            <div>{replies}</div>
          )}


        </div>
      </div>
    );
  }
}

export default Answer;
