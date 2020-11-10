import React from 'react';
import "./EndScreen.css";

function Row(props) {
    let tds = props.data.map(
        (dataPt) => <td key={dataPt}>{dataPt}</td>
    );
    return (
        <tr>
            {tds}
        </tr>
    )
}

function DataTable(props) {
    // Take in data from props
    let data = props.data;

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
        columnNames = ["Round", "Initial Equity Bal", "Initial Cash Bal", "Market Result", "Market Change", "Equities After Market", "Cash After Spending", "Did the Player Rebalance?", "Final Equity Bal", "Final Cash Bal"];
    } else if (props.version === 2) {
        columnNames = ["Round", "Investment Portfolio Bal", "Spending Portfolio Bal", "Market Result", "Market Change", "Investment Portfolio After Market", "Spending Portfolio After Spending", "Did the Player Rebalance?", "Final Investment Portfolio Bal", "Final Spending Portfolio Bal"]
    }

    // Make the table headers using the list of column names
    const tableHeader = columnNames.map(
        (columnName) => <th scope="col" key={columnName}>{columnName}</th>
    );

    // Create the rows from the game data
    let rows = [];
    for (let i = 0; i < tableData.length; i++) {
        // Add a new row with using the data for that row
        rows.push(<Row data={tableData[i]} key={`row-${i+1}`} />);
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
            message = `Congratulations! You successfully completed ${rounds} rounds of the game and finished with a total balance of $${this.data[rounds - 1].potAFinal + this.data[rounds - 1].potBFinal}.`
        } else if (result === "failed") {
            message = `Unfortunately, you failed to complete the game and ran out of money. You made it through ${rounds} rounds successfully.`
        }

        // Render the info from the game if the user accessed the link from the game
        if (this.data) {
            return (
                <div className="end-screen-info">
                    <DataTable data={this.data} version={this.props.location.state.version} /> <br />
                    {message}
                </div>
            );
        } else {
            return (
                <h1>Must access this page from the game!</h1>
            );
        }
    }
}