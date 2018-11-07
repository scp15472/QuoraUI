import React from 'react'
import {Row, Button} from 'react-materialize'
import AppActions  from '../actions/AppActions'
export default class Answer extends React.Component{
    constructor(){
        super();
        this.upVoteClick = this.upVoteClick.bind(this);
        this.downVoteClick = this.downVoteClick.bind(this);
    }

    downVoteClick(){
        const answer_id= this.props.answer.id;
        AppActions.downvote(answer_id) 
    }

    upVoteClick(){
       const answer_id = this.props.answer.id;
       AppActions.upvote(answer_id) 
    }

    render(){
        const ans = this.props.answer;
        return (
            <div>
                <Row>
                    {ans.string}
                    &nbsp; &nbsp;
                    <Button floating small="true"className='blue' icon= 'thumb_up' disabled ={!this.props.isUserLoggedIn} onClick={this.upVoteClick}/>{ans.upvoteCount}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button floating small="true" className='red' icon= 'thumb_down' disabled ={!this.props.isUserLoggedIn} onClick={this.downVoteClick}/>{ans.downvoteCount}
                </Row>
            </div>
        )
    }
}