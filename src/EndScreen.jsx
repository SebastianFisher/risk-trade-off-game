import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./EndScreen.css";

function Row(props) {
    let data = props.data;
    const tds = []
    for (let i = 0; i < data.length; i++) {
        let tempDataPt;
        // If not on the round column, make all numbers into dollars
        if (i === 0 || typeof (data[i]) !== "number") {
            tempDataPt = data[i];
        } else {
            tempDataPt = `$${data[i].toFixed(2)}`;
        }
        tds.push(
            <td key={`row-${props.row}-column-${i + 1}`}>{tempDataPt}</td>
        );
    }
    return (
        <tr>
            {tds}
        </tr>
    )
}

function DataTable(props) {
    // Take in data from props
    let data = props.data;
    console.log(data)
    // Separate data into a two dimensional array containing arrays of round data
    let tableData = [];
    for (let i = 0; i < data.length; i++) {
        let roundData = [];
        for (let property in data[i]) {
            roundData.push(data[i][property]);
        }
        tableData.push(roundData);
    }

    // Create the names for the columns based on the game's version
    let columnNames;
    if (props.version === 1) {
        columnNames = ["Round", "Initial Equity Bal ($)", "Initial Cash Bal ($)", "Market Result", "Market Change ($)", "Equities After Market ($)", "Cash After Spending ($)", "Did the Player Rebalance?", "Final Equity Bal ($)", "Final Cash Bal ($)"];
    } else if (props.version === 2) {
        columnNames = ["Round", "Initial Growth Portfolio Bal ($)", "Spending Portfolio Bal ($)", "Market Result", "Market Change ($)", "Growth Portfolio Bal After Market ($)", "Spending Portfolio After Spending ($)", "Did the Player Rebalance?", "Final Growth Portfolio Bal ($)", "Final Spending Portfolio Bal ($)"];
    }

    // Make the table headers using the list of column names
    const tableHeader = columnNames.map(
        (columnName) => <th scope="col" key={columnName}>{columnName}</th>
    );

    // Create the rows from the game data
    let rows = [];
    for (let i = 0; i < tableData.length; i++) {
        // Add a new row with using the data for that row
        rows.push(<Row data={tableData[i]} key={i + 1} />);
    }

    // Return the completed table
    return (
        <table>
            <thead>
                <tr>
                    {tableHeader}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}



export default class EndScreen extends React.Component {
    constructor(props) {
        super(props);

        // Object for the data from the last page.
        this.data = this.props.location.state.gameData;
    }

    render() {
        // Set the message based on the result of the game and the amount of rounds
        let message;
        const result = this.props.location.state.result;
        const rounds = this.data.length;
        if (result === "success") {
            message = `Congratulations! You successfully completed ${rounds} rounds of the game and finished with a total balance of $${(this.data[rounds - 1].potAFinal + this.data[rounds - 1].potBFinal).toFixed(2)}.` +
                " Your stats for each round are shown in the table above.";
        } else if (result === "failed") {
            message = `Unfortunately, you failed to complete the game and ran out of money. You made it through ${rounds - 1} rounds successfully ` +
                ` before going bankrupt on round ${rounds}. Your stats for each round are shown in the table above.`
        }

        // Render the info from the game if the user accessed the link from the game
        if (this.data) {
            return (
                <div className="end-screen-info">
                    <DataTable data={this.data} version={this.props.location.state.version} /> <br />
                    {message} 
                    <br />
                    <br />
                    <br />
                    <Link to="./" className="home-btn">
                        <Button variant="danger"><span className="home-btn">Return to Home Page</span></Button>
                    </Link>
                </div>
                
            );
        } else {
            return (
                <h1>Must access this page from the game!</h1>
            );
        }
    }
}