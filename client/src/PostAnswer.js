import React, {Component} from 'react';
import {Link} from "@reach/router";

class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.answers);
    }

    render() {
        return (
            <>
                <hr/>
                <p>Answer question:</p>
                <input name="answer" onChange={event => this.onChange(event)} type="text" />
                <p></p>
                <button onClick={_ => this.onSubmit()}>Answer Question</button>

            </>
        );
    }
}
export default PostAnswer;
