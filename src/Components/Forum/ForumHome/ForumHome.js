import React, { Component } from "react";
import Question from "../Question/Question";
import axios from "axios";
import firebase from "../../firebase/firebase";

class ForumHome extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      filteredQuestions: [],
      currentQuestionId: "",
      uid: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ uid: user.uid });
      console.log(this.state.uid);
    });

    axios.get(`/forum`).then(res => {
      this.setState({ questions: res.data });
      console.log(res.data);
    });
  }

  //calls for current users questions
  viewUserQuestions = () => {
    if (this.state.uid !== false) {
      axios.get(`/forum/user/${this.state.uid}`).then(res => {
        this.setState({ filteredQuestions: res.data });
      });
    }
  };

  //sets the currerent question id
  setCurrentQuestionId = id => {
    this.setState({ currentQuestionId: id });
  };

  render() {
    return (
      <div className='forum-main'>
        <div>
          {this.state.uid !== false ? (
            <div>
              <button onClick={this.viewUserQuestions}>View My Posts</button>
              <button>View All Posts</button>
            </div>
          ) : null}
        </div>
        <Question
          questions={this.state.questions}
          setCurrentQuestionId={this.setCurrentQuestionId}
        />
      </div>
    );
  }
}

export default ForumHome;
