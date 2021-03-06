import React, { Component } from "react";
import Question from "../Question/Question";
import axios from "axios";
import firebase from "../../firebase/firebase";
import AskQuestion from "../AskQuestion/AskQuestion";

class ForumHome extends Component {
  constructor() {
    super();

    this.state = {
      queryContent: "",
      questions: [],
      filteredQuestions: [],
      uid: "",
      username: ""
    };
  }

  componentDidMount() {
    // console.log(this.props);
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.setState({ uid: user.uid, username: user.displayName });
      }
    });

    axios.get(`/forum`).then(res => {
      this.setState({ questions: res.data });
    });
  }

  //calls for current users questions
  viewUserQuestions = () => {
    if (this.state.uid !== "") {
      axios.get(`/forum/user/${this.state.uid}`).then(res => {
        this.setState({ questions: res.data });
      });
    }
  };

  //gets all forum questions after a submission is made
  getAll = () => {
    axios.get(`/forum`).then(res => {
      this.setState({ questions: res.data });
      console.log(res.data);
    });
  };

  //allows logged in users to delete their own posts
  deletePost = id => {
    axios.delete(`/forum/post/${id}`).then(() => this.getAll());
    console.log(id);
  };

  handleQuery = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  querySubmit = () => {
    axios
      .get(`/forum/search/general?q=${this.state.queryContent}`)
      .then(res => {
        this.setState({ questions: res.data });
        this.setState({ queryContent: "" });
      });
  };

  render() {
    // console.log(this.state.uid)
    return (
      <div className='forum-main'>
        <div className='forum-nav'>
          {this.state.uid !== "" ? (
            <div className='forum-nav-user'>
              <button onClick={this.viewUserQuestions} className='forum-button'>
                MY POSTS
              </button>
              <AskQuestion
                uid={this.state.uid}
                username={this.state.username}
                getAll={this.getAll}
              />
            </div>
          ) : null}

          <div>
            <h2>SEARCH FORUM:</h2>
            <input
              type='text'
              name='queryContent'
              value={this.state.content}
              onChange={this.handleQuery}
            />
            <button onClick={this.querySubmit}>SEARCH</button>
          </div>
          <button
            onClick={this.getAll}
            className='get-all-forum-btn forum-button'>
            VIEW ALL POSTS
          </button>
        </div>
        <Question
          uid={this.state.uid}
          questions={this.state.questions}
          setCurrentQuestionId={this.setCurrentQuestionId}
          deletePost={this.deletePost}
          getAll={this.getAll}
        />
      </div>
    );
  }
}

export default ForumHome;
