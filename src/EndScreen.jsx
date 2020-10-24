import React from 'react';
import "./EndScreen.css";

export default class EndScreen extends React.Component {
    constructor(props) {
        super(props);

        // Object for the data from the last page.
        this.info = this.props.location.state;
    }

    render() {
        // Render the info from the game if the user accessed the link from the game
        if (this.info.fromGame) {
            return (
                <p>{this.info.balance}</p>
            );
        } else {
            return (
                <h1>Must access this page from the game!</h1>
            );
        }
    }
}