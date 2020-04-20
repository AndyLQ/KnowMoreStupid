import React, {Component} from 'react';
import {Link} from "@reach/router";

class Questions extends Component {

    render() {
        let questions = this.props.data;

        //Lesson3
        let list = questions.map(
            elm => <><li key={elm._id}>
                <Link to={`/question/${elm._id}`}>{elm.title}<br/></Link>
            </li><br/></>
        );

        return (
            <>
                <h2>Questions</h2>
                <ul>{list}
                </ul>
            </>
        );
    }
}

    export default Questions;



