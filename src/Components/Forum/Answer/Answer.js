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
    axios
      .post(`/forum/reply/${this.props.question.id}`, {
        content: this.state.newReplyContent,
        uid: this.props.uid,
        username: this.props.question.username
      })
      .then(() => {
        this.props.getAll();
      });
    this.props.toggleReplies();
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
          <div>{e.content.toUpperCase()}</div>
          {this.props.replies.id === this.props.user ? (
            <button onClick={() => this.props.deleteReply(e.id)}>Delete</button>
          ) : null}
        </div>
      );
    });

    return (
      <div className={showHideReplies}>
        <div className='replies-card'>
          <div className='close-button'>
            <button onClick={this.props.toggleReplies}>X</button>
          </div>
          <h1>{this.props.question.content.toUpperCase()}</h1>
          <div className='forum-button-bar'>
            <p>SUBMIT A REPLY: </p>
            {this.props.uid !== "" ? (
              <div className='replies-buttons'>
                <textarea
                  type='text'
                  name='newReplyContent'
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <button className='reply-button' onClick={this.submitReply}>
                  SUBMIT
                </button>
              </div>
            ) : (
              <div className='reply-modal'>
                <button className='reply-modal'>Reply</button>
                <p className='reply-text'>Must be Signed in to reply</p>
              </div>
            )}
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
