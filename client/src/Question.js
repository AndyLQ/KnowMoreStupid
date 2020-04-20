import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {

    submit(answer) {
        this.props.submit(answer, this.props.id);
    }

    vote(answerID, isUpvote) {
        this.props.vote(this.props.id, answerID, isUpvote);

    }

    renderAnswers() {
        const question = this.props.getQuestion(this.props.id);

        if (question === undefined) {
           return <p>Loading</p>
        } else {
            if (question.answers.length === 0) {
                return <p>No answers!</p>;
            } else {

                return question.answers.map(answer => <section>
                    <ul>
                        <li>{answer.text}</li>
                        <p>Votes: {answer.votes}</p>
                        <button onClick={() => this.vote(answer.id, true)}>Upvote</button>
                        <button onClick={() => this.vote(answer.id, false)}>Downvote</button>
                    </ul>
                </section>);
            }
        }
    }

    render() {
        let question = this.props.getQuestion(this.props.id);

        return (
            <>
                <h3>{question.title}</h3>
                <p>{question.desc}</p>
                <hr/>
                <section>{this.renderAnswers()}</section>
                <PostAnswer submit={(answer) => this.submit(answer)}></PostAnswer>
            </>
        );
    }
}
    export default Question;
