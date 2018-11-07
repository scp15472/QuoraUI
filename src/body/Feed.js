import React from 'react'
import Question from './Question'

export default class Feeds extends React.Component{
    render(){
        const feeds = this.props.feeds.feeds;
        console.log("Feeds inside Feeds: ", feeds)
        return <div>
            {
                feeds.map(feed =>{
                    return <Question feed ={feed} isUserLoggedIn={this.props.isUserLoggedIn}/>
                })
            }
        </div>
    }
}