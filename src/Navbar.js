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
  
  getUserDetail() {
    if (this.props.isUserLoggedIn) {
      return this.props.currentUser
    } else {
      return <Icon>account_circle</Icon>
    }
  }

  
  render() {
    return <div>
      <Navbar brand='Mutex Quora' right>
        <NavItem onClick={this.onHomeCLicked}><Icon>home</Icon></NavItem>
        <NavItem onClick={this.accountClicked}>{this.getUserDetail()}</NavItem>
      </Navbar>
    </div>
  }
}