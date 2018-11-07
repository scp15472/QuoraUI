import React from 'react'
import { Row, ProgressBar, Button, Input, Modal, Tabs, Tab } from 'react-materialize'
import AppActions from '../actions/AppActions'
import Feeds from './Feed'

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      popupError: {
        show: false,
        message: "",
      }
    };
    this.getBody = this.getBody.bind(this);
    this.getLoader = this.getLoader.bind(this);
    this.getLoginPopup = this.getLoginPopup.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.signUpClicked = this.signUpClicked.bind(this);
  }

  componentDidMount() {
    AppActions.loadFeeds();
  }

  getBody() {
    if (!this.props.showLoader) {
      return <div className="body">
        <Feeds feeds={this.props.feeds} isUserLoggedIn={this.props.isUserLoggedIn}/>
      </div>
    } else {
      return null
    }
  }

  getLoader() {
    if (this.props.showLoader) {
      return <div className="body">
        <Row>
          <ProgressBar />
        </Row>
      </div>
    }
  }

  loginClicked() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password1").value
    const user = {
      username, password
    }
    AppActions.login(user)
  }

  getErrorMessage() {
    const error = this.state.popupError;
    if (error.show) {
      return <font color="red">{this.state.popupError.message}!</font>
    } else {
      return null
    }
  }

  signUpClicked() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirm_password = document.getElementById("confirm_password").value
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const maleGender = document.getElementById("male").checked
    const femaleGender = document.getElementById("female").checked
    const gender = maleGender ? "male" : "female";
    const phone = document.getElementById("phone").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value
    if (password !== confirm_password) {
      const state = this.state;
      state.popupError.show = true;
      state.popupError.message = "Password and Confirm password does not match";
      this.setState(state);
      return;
    }
    const user = {
      username, password, first_name, last_name, gender, phone, city, email
    }
    console.log(user)
    AppActions.signUp(user)
  }

  onModalClose() {
    AppActions.closeModal()
  }

  getLoginPopup() {
    return <div className="body">
      <Modal open={this.props.showLogin}  actions={
              <div>
                <Button waves="light" className="red darken-2" onClick={this.onModalClose}>Close</Button>
              </div>
            }>
      {
          this.getErrorMessage()
      }
    <Tabs className='tab-demo z-depth-1'>
          <Tab title="Login" active>
            <Row>
              <Input type="text"  label="username" s={12} id="username" />
              <Input type="text"  label="password" s={12} id="password1" />
            </Row>
            <Row>
              <Button onClick={this.loginClicked}>Login</Button>
            </Row>
          </Tab>
          <Tab title="Signup">
            <Row>
              <Input type="text"  label="username" s={12} id="username" />
              <Input type="text"  label="password" s={12} id="password" />
              <Input type="text"  label="confirm_password" s={12} id="confirm_password" />
              <Input type="text"  label="first_name" s={12} id="first_name" />
              <Input type="text"  label="last_name" s={12} id="last_name" />
              <Input type="radio" label="Male" name="gender" id="male" checked/>
              <Input type="radio" label="Female" name="gender" id="female"/>
              <Input type="text"  label="phone" s={12} id="phone" />
              <Input type="text"  label="city" s={12} id="city" />
              <Input type="text"  label="email" s={12} id="email" />
            </Row>
            <Row>
              <Button onClick={this.signUpClicked}>SignUp</Button>
            </Row>
          </Tab>
        </Tabs>
      </Modal>
    </div>;
  }

  render() {
    return <div>
      {this.getLoader()}
      {this.getBody()}
      {this.getLoginPopup()}
    </div>
  }
}