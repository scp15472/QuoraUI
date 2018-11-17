import Reflux from 'reflux'
import Actions from '../actions/AppActions'
import signup from '../services/signup'
import login from '../services/login'
import feed from '../services/feed'
import question from '../services/question'
import answer from '../services/answer'
import upvote from '../services/upvote'
import downvote from '../services/downvote'
import getuserLogin from '../services/getUserLogin'


const store = Reflux.createStore({
  listenables: [Actions],
  
  onGoToHome() {
    console.log("Action came into AppStore...");
    const triggerObj = {
      action: "goToHome",
      data: ""
    };
    this.trigger(triggerObj);
  },

  onUserClick() {
    console.log("User clicked...");
    const triggerObj = {
      action: "userClick",
      data: "Some data.."
    }
    this.trigger(triggerObj)
  },

  onView_module(){
    console.log("On View_Module Click...");
    const triggerObj = {
      action: "view_module",
      data: "Some data..."
    }
    this.trigger(triggerObj)
  },

  onQuestionClick() {
    console.log("POST_YOUR_Question clicked...");
    const triggerObj = {
      action: "questionClick",
      data: "Some data.."
    }
    this.trigger(triggerObj)
  },

  onLoadFeeds() {
    const promise = feed()
    promise.then(data=>{
      const triggerObj = {
        action: "loadFeeds",
        data: data
      }
      console.log("Action received at store...",data);
      this.trigger(triggerObj)
    })
  },

  onLogin(user) {
    console.log("Logging in for user... ",user);
    const loginPromise = login(user)
    loginPromise.then((data)=>{
      console.log("Response from network...", data)
      const triggerObj = {
        action : "login",
        data :{
          success : true,
          user : data.Login.user
        }
      };
      console.log("---------------------")
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from network...", error)
      const triggerObj = {
        action: "login",
        data: {
          success:false
        } 
      };
      this.trigger(triggerObj);
    })
  },

  onSignUp(user) {
    console.log("Signing in for use...", user);
    const signUpPromise = signup(user)
    signUpPromise.then((data)=>{
      console.log("Respnse from network...", data);
      const triggerObj = {
        action: "signUp",
        data: {
          success: true,
          user: data.User
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from nework...", error)
      const triggerObj = {
        action: "signUp",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  },

  onCloseModal() {
    const triggerObj = {
      action: "closeModal",
    }
    this.trigger(triggerObj)
  },

  onQuestion(string, topicID){
    const data = {string, topicID}
    console.log("PostQuestion in for use...", data);
    const questionPromise = question(data)
    questionPromise.then((data)=>{
      console.log("Response from network...", data);
      const triggerObj = {
        action: "question",
        data: {
          success: true,
          data: data.data
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from network...", error)
      const triggerObj ={
        action: "question",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  },  

  onAnswer(question, string) {
    const data  = {
      question,
      string
    }
    console.log("PostAnswer in for use...", data);
    const answerPromise = answer(data)
    answerPromise.then((data)=>{
      console.log("Respnse from network...", data);
      const triggerObj = {
        action: "answer",
        data: {
          success: true,
          data: data.data 
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from nework...", error)
      const triggerObj = {
        action: "answer",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  },

  onUpvote(answer_id){
    const data ={
      answer_id
    }
    console.log("PostUpvote for...", data);
    const upvotePromise = upvote(data)
    upvotePromise.then((data)=>{
      console.log("Respnse from network...", data);
      const triggerObj = {
        action: "upvote",
        data: {
          success: true,
          user: data.User
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from nework...", error)
      const triggerObj = {
        action: "upvote",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  },

  onDownvote(answer_id) {
    const data ={
      answer_id
    }
    console.log("PostDownvote in for use...", data);
    const postDownvotePromise = downvote(data)
    postDownvotePromise.then((data)=>{
      console.log("Respnse from network...", data);
      const triggerObj = {
        action: "downvote",
        data: {
          success: true,
          user: data.User
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from nework...", error)
      const triggerObj = {
        action: "downvote",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  },
  onGetUserLogin(){
    const getUserLoginPromise = getuserLogin()
    getUserLoginPromise.then((data)=>{
      console.log("Respnse from network...", data)
      const triggerObj = {
        action: "getUserLogin",
        data: {
          success: true,
          user:data.Login.user
        }
      };
      this.trigger(triggerObj);
    }).catch((error)=>{
      console.log("Error from nework...", error)
      const triggerObj = {
        action: "getUserLogin",
        data: {
          success:false
        }
      };
      this.trigger(triggerObj);
    })
  }




});

export default store