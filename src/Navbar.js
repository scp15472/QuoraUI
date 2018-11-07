import React from 'react'
import {Navbar, NavItem, Icon} from 'react-materialize'
import AppActions from './actions/AppActions'

export default class MyNavbar extends React.Component {
  constructor() {
    super();
    this.getUserDetail = this.getUserDetail.bind(this)
  }

  onHomeCLicked() {
    console.log("Hello clicked on search....");
    AppActions.goToHome();
  }

  accountClicked() {
    AppActions.userClick();
  }

  view_module(){
    console.log("from Navbar.js/view_module")
    AppActions.view_module();
  }
  
  getUserDetail() {
    if (this.props.isUserLoggedIn) {
      return this.props.currentUser
    } else {
      return <Icon>account_circle</Icon>
    }
  }

  questionDetail() {
    if(this.props.isUserLoggedIn) {
      return <Icon>view_module</Icon>
    } else {
      return null
    }
  }

  
  render() {
    return <div>
      <Navbar brand='Mutex Quora' right>
        <NavItem onClick={this.onHomeCLicked}><Icon>home</Icon></NavItem>
        <NavItem onClick={this.view_module}>{this.questionDetail()}</NavItem>
        <NavItem onClick={this.accountClicked}>{this.getUserDetail()}</NavItem>
      </Navbar>
    </div>
  }
}