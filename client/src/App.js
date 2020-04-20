import React, {Component} from 'react';
import Question from './Question';
import Questions from './Questions';
import {Router} from "@reach/router";
import AskQuestion from "./AskQuestion";

class App extends Component {
    API_URL = 'https://knowmore-stupid.herokuapp.com';

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };

    }

    componentDidMount() {
        // Get everything from the API
        this.getQuestions().then(() => console.log("Questions gotten!"));
    }

    async getQuestions() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let data = await result.json(); // Turn it into object
        return this.setState({ // Set it in the state
            questions: data
        })
    }

    getQuestion(id) {
        return this.state.questions.find(question => question._id === id);
    }

    async submitQuestion(title, desc) {
        const response = await fetch(`${this.API_URL}/questions`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                title: title,
                desc: desc,
                answers: []
            })
        });
        const data = await response.json();
        console.log("printing the response:", data);
        this.getQuestions()
    }

/*
    async submitAnswer(answer, questionID) {
        const response = await fetch(`${this.API_URL}/questions`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                title: title,
                desc: desc,
                answers: []
            })
        });
        const data = await response.json();
        console.log("printing the response:", data);
    }
*/

    setAnswer(answer, questionID) {
        if (answer !== "") {
            let stateCopy = this.state.questions;
            console.log(stateCopy);
            let targetQuestion = stateCopy.find(question => question._id === questionID);
            console.log(targetQuestion);
            targetQuestion.answers.push({id:targetQuestion.answers.length, text: answer, votes: 0});
            this.setState(
                {
                    questions: stateCopy
                }
            );
        }
    }



    vote(questionID, answerID, isUpvote) {
        let stateCopy = this.state.questions;
        let targetQuestion = stateCopy.find(question => question._id === questionID);
        let targetAnswer = targetQuestion.answers.find(answer => answer._id === answerID);

        console.log(targetQuestion + targetAnswer);
        if (isUpvote) {
            targetAnswer.votes ++;
        } else {
            targetAnswer.votes --;
        }

        this.setState({
                questions: stateCopy
            });

    }

    render() {
        return (
            <>
                <Questions data={this.state.questions}></Questions>
                <AskQuestion submit={(title, desc) => this.submitQuestion(title, desc)}></AskQuestion>
                <hr/>
                <Router>
                    <Question
                    path="/question/:id" getQuestion={(id) => this.getQuestion(id)}
                    submit={(answer, questionID) => this.setAnswer(answer, questionID)}
                    vote={(questionID, answerID, isUpvote) => this.vote(questionID, answerID, isUpvote)}>
                    </Question>
                </Router>

            </>
        );
    }

}

export default App;
