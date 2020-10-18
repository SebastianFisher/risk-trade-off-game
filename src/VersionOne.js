import React from 'react';
import './VersionOne.css';
import Button from 'react-bootstrap/Button'

class VersionOne extends React.Component {
  constructor(props) {
    super(props);
    // Sets states with values for the balance, round, and rounds
    this.state = {
      balance: 20,
      round: 1,
      rounds: Math.floor(Math.random() * 10 + 6)
    };

    this.spend = this.spend.bind(this);
    this.markets = this.markets.bind(this);
  }

  // Spends $1 of balance (has to be done every round)
  spend() {
    this.setState(state => ({
      balance: this.state.balance - 1
    }));
  }

  // Simulates action of the markets on your balance
  markets() {
    Math.round(Math.random) === 1 ? this.setState(state => ({balance: this.state.balance * 0.75})) : this.setState(state => ({balance: this.state.balance * 1.5}));
  }

  render() {
    return (
      <div className="version-one">
        <h1 className="title">Retirement Game</h1>
        <p className="info">
          Balance: {this.state.balance}<br></br>
          Round: {this.state.round}<br></br>
          Total Rounds: {this.state.rounds}<br></br>
        </p>
        <div className="option-buttons">
          <Button className="button" variant="primary" onClick={this.spend}>Spend $1</Button><br></br>
          <Button className="button" variant="primary" onClick={this.markets}>Markets</Button><br></br>
        </div>
      </div>
    )
  }
}

export default VersionOne;
