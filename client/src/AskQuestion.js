import React, {Component} from 'react';
import {Link} from "@reach/router";

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.title, this.state.desc);
    }

    render() {
        return (
            <>
                <p>Question:</p>
                <input name="title" onChange={event => this.onChange(event)} type="text" />

                <p>Description</p>
                <input name="desc" onChange={event => this.onChange(event)} type="text"/>
                <p></p>
                <button onClick={_ => this.onSubmit()}>Ask Question</button>
            </>
        )
    }
}

export default AskQuestion;