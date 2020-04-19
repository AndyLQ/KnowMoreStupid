import React, {Component} from 'react';
import Question from './Question';
import Questions from './Questions';
import {Router} from "@reach/router";
import AskQuestion from "./AskQuestion";
import PostAnswer from "./PostAnswer";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            questions: [
                {
                    id: 0,
                    title: "What is a horse?",
                    desc: "I dont know what a horse is, my friend was talking about it the other day. What is it?",
                    answer: []

                },
                {
                    id: 1,
                    title: "How many legs does a goat have",
                    desc: "Im trying to assemble my own goat, but i forgot how many legs a goat has. Help?!?",
                    answer: []
                },
                {
                    id: 2,
                    title: "How much wood?",
                    desc: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
                    answer: []
                },
                {
                    id: 3,
                    title: "What is the price of calling 911 outside business hours?",
                    desc: "I need help, but i am also poor. I want to call 911 but i want to be sure that its free",
                    answer: []
                },
                {
                    id: 4,
                    title: "How long should i boil my pizza",
                    desc: "My friend told me to try boiling my pizza, but i dont know how long it should boil? Also how much water do i need?",
                    answer: []
                },
                {
                    id: 5,
                    title: "How do i defeat a stick?",
                    desc: "The last boss of my D&D sessions is a regular stick, i am a level 19 Warrior half-orc, but everytime i attack it, it breaks and now there's 2!, Try again and now theres 4? - we have been at this game for 6 sessions already, Help!",
                    answer: []
                },
                {
                    id: 6,
                    title: "What is a dingo?",
                    desc: "I dont know what a dingo is, please help",
                    answer: [
                        {
                            id: 0,
                            text: "Its like a wild dog, from down-under",
                            votes: 12
                        },
                        {
                            id: 1,
                            text: "Its what dreams are made of",
                            votes: 2
                        },
                        {
                            id: 2,
                            text: "Its a game similar to 'bingo' but they have copyright so its basically a knockoff",
                            votes: -4
                        }
                    ]
                },
                {
                    id: 7,
                    title: "Can you kill a doctor with an apple?",
                    desc: "I want to kill my doctor, before he kills me with all his tools and stuff",
                    answer: [

                        {
                            id: 0,
                            text: "Yes if its a grenade apple aka. pomegranate",
                            votes: -5
                        },
                        {
                            id: 1,
                            text: "An apple is a fruit, very healthy, therefore it would just heal the doc",
                            votes: 7
                        },
                        {
                            id: 2,
                            text: "Theoretically the mass of a regular apple, thrown fast enough, would be able to damage a doctor to a lethal extend",
                            votes: 15
                        },
                        {
                            id: 3,
                            text: "An apple a day keeps the doctor away, it doesnt kill him stupid",
                            votes: 4
                        }
                    ]
                }
            ]
        }

    }


    componentDidMount() {
        // Get everything from the API
        this.getQuestions().then(() => console.log("Questions gotten!"));
    }

    async getQuestions() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    //functions

    submit (title, desc) {
        const AskQuestion = {
            id: this.state.questions.reduce(
                (prev, curr) => prev > curr.id ? prev : curr.id, 0) +1,
            title: title,
            desc: desc,
            answer: []
        };
        this.setState({
            questions: [...this.state.questions, AskQuestion]
        })
    }

    setAnswer(answer, questionID) {
        if (this.state.answer !== "") {
            let stateCopy = this.state.questions;
            let targetQuestion = stateCopy.find(question => question.id === Number(questionID));
            targetQuestion.answer.push({id:targetQuestion.answer.length ,text: answer, votes: 0});
            this.setState(
                {
                    questions: stateCopy
                }
            );
        }
    }

    getQuestion(id) {
        return this.state.questions.find(question => question.id === parseInt(id))
    }

    vote(questionID, answerID, isUpvote) {
        let stateCopy = this.state.questions;
        let targetQuestion = stateCopy.find(question => question.id === Number(questionID));
        let targetAnswer = targetQuestion.answer.find(answer => answer.id === Number(answerID));

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
                <AskQuestion submit={(title, desc) => this.submit(title, desc)}></AskQuestion>
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
