import React, { Component } from 'react';
import './App.css';
import Reflux from 'reflux'
import AppStore from './stores/AppStore'
import Navbar from './Navbar'
import Body from './body/Body'
import AppActions from './actions/AppActions'

const listenermixin = Reflux.ListenerMixin;

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: true,
      showLogin: false,
      postQuestion: false,
      isUserLoggedIn: false,
      currentUser: {},
      feeds: {}
    }
    this.onAppStore = this.onAppStore.bind(this);
    listenermixin.listenTo(AppStore, this.onAppStore)
  }

  componentDidMount(){
    AppActions.getUserLogin()
  }

  onAppStore(triggerObj) {
    if (triggerObj.action === "goToHome") {
      console.log("trigger received at parent component...", triggerObj.data);
    }
    if (triggerObj.action === "userClick") {
      const newState = this.state;
      newState.showLogin = true;
      this.setState(newState)
    }
    if (triggerObj.action === "view_module"){
      console.log("from app.js/view_module")
      const newState = this.state;
      newState.postQuestion = true;
      this.setState(newState)
    }
    if (triggerObj.action === "loadFeeds") {
      const state = this.state
      state.showLoader = false;
      state.feeds = triggerObj.data;
      this.setState(state);
    }
    if (triggerObj.action === "login") {
      if (triggerObj.data.success === true) {
        alert("Login successful..." + triggerObj.data.user.first_name);
        console.log(triggerObj.data)
        const newState = this.state;
        newState.showLogin = false;
        newState.isUserLoggedIn = true;
        newState.currentUser = triggerObj.data.user.first_name;
        this.setState(newState);
      }
    }
    if (triggerObj.action === "getUserLogin") {
      if (triggerObj.data.success === true) {
        console.log(triggerObj.data.user)
        const newState = this.state;
        newState.showLogin = false;
        newState.isUserLoggedIn = true;
        newState.currentUser=triggerObj.data.user.first_name
        this.setState(newState);
      }
    }
    if (triggerObj.action === "signUp") {
      if (triggerObj.data.success === true) {
        alert("SignUp successful..." + triggerObj.data.first_name);
        console.log(triggerObj.data)
        const newState = this.state;
        newState.showLogin = false;
        newState.isUserLoggedIn = true;
        newState.currentUser = triggerObj.data.user;
        this.setState(newState);
      }
    }
    if (triggerObj.action === "closeModal") {
      const state = this.state
      state.showLogin = false
      this.setState(state);
    }
    if(triggerObj.action === "question") {
      if(triggerObj.data.success === true) {
        alert("Question is Successfully submitted...");
        console.log(triggerObj.data)
        const newState = this.state;
        newState.postQuestion = false;
        this.setState(newState)
        AppActions.loadFeeds();
      }
    }
    if (triggerObj.action ==='answer') {
      if(triggerObj.data.success === true){
        AppActions.loadFeeds();
      }
    }
    if (triggerObj.action ==='upvote') {
      AppActions.loadFeeds()
    }
    if (triggerObj.action ==='downvote') {
      AppActions.loadFeeds()
    }

 
  }

  render() {
    return (
      <div className="App">
        <Navbar isUserLoggedIn={this.state.isUserLoggedIn} currentUser={this.state.currentUser}/>
        <Body showLoader={this.state.showLoader} showLogin={this.state.showLogin} feeds={this.state.feeds} isUserLoggedIn={this.state.isUserLoggedIn} postQuestion={this.state.postQuestion}/>
      </div>
    );
  }
}

export default App;
