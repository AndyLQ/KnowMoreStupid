import React, {Component} from 'react';
import Question from './Question';
import Questions from './Questions';
import {Router} from "@reach/router";
import AskQuestion from "./AskQuestion";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

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


    submitQuestion (title, desc) {
        const AskQuestion = {
            id: this.state.questions.reduce(
                (prev, curr) => prev > curr.id ? prev : curr.id, 0) +1,
            title: title,
            desc: desc,
            answers: []
        };
        this.setState({
            questions: [...this.state.questions, AskQuestion]
        })
    }

    setAnswer(answer, questionID) {
        if (this.state.answers !== "") {
            let stateCopy = this.state.questions;
            let targetQuestion = stateCopy.find(question => question.id === Number(questionID));
            targetQuestion.answers.push({id:targetQuestion.answers.length ,text: answer, votes: 0});
            this.setState(
                {
                    questions: stateCopy
                }
            );
        }
    }

    getQuestion(id) {
        return this.state.questions.find(question => question._id === id);
    }

    vote(questionID, answerID, isUpvote) {
        let stateCopy = this.state.questions;
        let targetQuestion = stateCopy.find(question => question._id === Number(questionID));
        let targetAnswer = targetQuestion.answers.find(
            answer => answer._id === Number(answerID)
        );

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
