import React from 'react'
import {CardPanel, Row, Input, Button} from 'react-materialize'
import Answer from "./Answer"
import AppActions from '../actions/AppActions'

export default class Question extends React.Component{
    constructor(){
        super()
        this.answer = this.answer.bind(this)
    }

    answer(){
        const question= this.props.feed.id;
        const string = document.getElementById("string" + question).value;
        if(string === ""){
            return 
        }
        AppActions.answer(question, string)
    }

    render(){
        const question = this.props.feed;
        const isUserLoggedIn=this.props.isUserLoggedIn;
        console.log("Feeds inside Feeds: ", question)
        return <h4>
            <CardPanel className="teal lighten-4 black-text">
            <span>{question.string}</span>
            {
                question.answers.map(ans =>{
                    return <Answer answer={ans} isUserLoggedIn={isUserLoggedIn}/>
                })
            }
            <Row>
                <Input s={9} label="Your Answer" id={"string" +question.id}/>
                <Button small="true" waves='light' onClick={this.answer} disabled={!isUserLoggedIn}>Submit</Button>
            </Row>
        </CardPanel>
        </h4>
    }
}