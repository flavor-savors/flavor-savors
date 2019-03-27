import React, { Component } from "react";
import Question from "../Question/Question";
import axios from "axios";
import firebase from "../../firebase/firebase";
import AskQuestion from "../AskQuestion/AskQuestion";

class ForumHome extends Component {
  constructor() {
    super();

    this.state = {
      queryContent:'',
      questions: [],
      filteredQuestions: [],
      currentQuestionId: "",
      uid: '',
      username:''
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user !== null){
        console.log(user)
        this.setState({ uid: user.uid, username:user.displayName });
      }
    });

    axios.get(`/forum`).then(res => {
      this.setState({ questions: res.data });
      console.log(res.data);
    });
  }

  //calls for current users questions STILL NEEDS A FUNCTIONAL ENDPOINT
  viewUserQuestions = () => {
    if (this.state.uid !== '') {
      axios.get(`/forum/user/${this.state.uid}`).then(res => {
        console.log(res.data)
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
  }
  //sets the currerent question id
  setCurrentQuestionId = id => {
    this.setState({ currentQuestionId: id });
  };

  //allows logged in users to delete their own posts
  deletePost = (id) => {
    axios.delete(`/forum/${id}`).then(()=> this.getAll())
    console.log(id)
}

handleQuery = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

querySubmit = () => {
  axios.get(`/forum/search/general?q=${this.state.queryContent}`).then((res)=>{
    this.setState({questions:res.data})
    this.setState({queryContent: ''})
  })
}

  render() {
    console.log(this.state.uid)
    return (
      <div className='forum-main'>
        <div>
        <button onClick={this.getAll}>View All Posts</button>
          {this.state.uid !== '' ? (
            <div>
              <button onClick={this.viewUserQuestions}>View My Posts</button>
              <AskQuestion
              uid={this.state.uid}
              username={this.state.username}
              getAll={this.getAll}/>
            </div>
          ) : null}
        </div>

        <div>
          <h1>Search Forum:</h1>
        <input type="text" name='queryContent' value={this.state.content} onChange={this.handleQuery}/>
        <button onClick={this.querySubmit}>Search</button>
        </div>

        <Question
          uid={this.state.uid}
          questions={this.state.questions}
          setCurrentQuestionId={this.setCurrentQuestionId}
          deletePost={this.deletePost}
          getAll={this.getAll}/>   
      </div>
    );
  }
}

export default ForumHome;
