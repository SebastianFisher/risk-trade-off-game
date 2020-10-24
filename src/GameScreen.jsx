import React from 'react';
import './GameScreen.css';
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import RebalanceSlider from "./RebalanceSlider.jsx";
import pic1 from "./images/market-increase.png";
import pic2 from "./images/market-decrease.png";

// Make it so the slider moves by like 10 cents (have to pass in min and max as props)
// Have the slider start at the inital percent balance
// Save results to a table somehow as the application moves along
// When you start the round, you should get a message (i.e the markets went up)
// Then the spending happens, and then you pop up the message parts up
// V1, say something about MPT making the allocation now auto 50/50
// V2, doesn't have auto rebalance, say that now markets went up or down, do you want 
// to add more years of spending

function RebalanceOptns(props) {
  let slider;
  let choices;
  if (props.showSlider) {
    choices = null;
    slider = (
      <div id="rebalance-slide">
        <RebalanceSlider onSlide={props.onSlide} />
        <Button id="done-rebalancing" variant="danger" onClick={props.done}>Done Rebalancing</Button>
      </div>);
  } else {
    choices = (
      <div id="choices-container">
        <label id="rebalance-q" for="choices">Would you like to rebalance before the next round?</label>
        <div id="choices">
          <Button id="yes-rebalance" variant="danger" onClick={(e) => props.onClick("yes", e)}>Yes</Button>
          <Button id="no-rebalance" variant="danger" onClick={(e) => props.onClick("no", e)}>No</Button>
          {slider}
        </div>
      </div>);
    slider = null;
  }

  return (
    <div className="rebalance">
      {choices}
      {slider}
    </div>
  );

}

function ContinueBtn(props) {
  if (props.end) {
    return (
      <Link
        to={{
          pathname: "/end",
          state: props.info
        }}
      >
        <Button variant="danger" onClick={props.onClick}>Continue</Button>
      </Link>
    );
  } else {
    return (
      <Button variant="danger" onClick={props.onClick}>Continue</Button>
    );
  }
}

function GameInfo(props) {
  if (props.version === 1) {
    return (
      <p className="info">
        Portfolio Balance: ${props.balance}<br />
        Round: {props.round}<br />
        Amount invested in equities: ${props.potA}<br />
        Amount held in cash: ${props.potB}<br />
      </p>
    );
  } else if (props.version === 2) {
    return (
      <p className="info">
        Round: {props.round}<br />
        Growth Portfolio Balance: {props.potA}<br />
        Spending Portfolio Balance: {props.potB}<br />
      </p>
    );
  }
}

function MarketInfo(props) {
  let result;
  let increased = props.change > 0;
  let newPotA = props.potA + props.change;
  if (increased) {
    result = `Hooray! The markets went up and your equities increased in value from $${props.potA} to $${newPotA}. `
  } else {
    result = `Uh oh! The markets went down and your equities decreased in value from $${props.potA} to $${newPotA}. `
  }

  let increaseOrDecrease = increased ? 'increase' : 'decrease';
  let info;
  if (props.version === 1) {
    info = `After the market ${increaseOrDecrease}, your portfolio was rebalance to 50/50 according to Modern Portfolio Theory. Then, $1 was taken from your portfolio to account for living expenses.`
  } else {

  }
  let end = props.shouldEnd() ? true : false;

  let bgImage = increased ? pic1 : pic2;
  return (
    <div>
    <div className="market-info">
      <img src={bgImage} alt={`market ${increaseOrDecrease}`}/>
      <p id="market-info-results">{result}{info}</p>
    </div>
      <ContinueBtn onClick={props.continue} end={end} info={props.gameData} />
    </div>
  );
}

function GameRules(props) {
  let rulesBtn = <Button variant="danger" onClick={props.onClick}>I Understand (Continue)</Button>
  if (props.version === 1) {
    return (
      <div className="game-rules">
        <h4>Rules:</h4>
        <ul className="rules-list">
          <li>
            At the start of the game you will have a portfolio worth $8. Half of the portfolio will be invested in stocks, and the other half will be in cash.
          </li>
          <li>
            The object of the game is to avoid running out of money, and you will get to keep any money remaining in your portfolio at the conclusion of the game.
          </li>
          <li>
            The game will continue for a number of rounds (“years”?) between 6 and 12, but you will not know in advance how many rounds there will be.
          </li>
          <li>
            The progression for each round will be as follows:
            <ul>
              <li>
                The computer will determine what happens in “the markets” by randomly choosing between two outcomes: in the first outcome, the money in your portfolio that is allocated to stocks will double, while in the second outcome the stocks portion of the portfolio will be cut in half
              </li>
              <li>
                Regardless of what happens in the markets, the computer will take $1 from your “paycheck” portfolio to cover your annual spending
              </li>
              <li>
                The computer will then “rebalance” your portfolio. The initial default for the rebalancing will be to allocate the portfolio equally between  stocks and cash, but in each round you will have the option to adjust the default allocation up to 25% in either direction (i.e. between 25% cash/ 75% stocks and 75% cash /25% equities)
              </li>
              <li>
                Once you have decided on any changes to the default asset allocation, the game will proceed to the next round
              </li>
            </ul>
          </li>
        </ul>
        {rulesBtn}
      </div>
    )
  } else if (props.version === 2) {
    return (
      <div className="game-rules">
        <h4>Rules:</h4>
        <ul className="rules-list">
          <li>
            At the start of the game you will have two portfolios, a “paycheck” portfolio with $4 and a “growth” portfolio, also with $4. The purpose of the paycheck portfolio is to finance your “annual” spending of $1, which means that at the outset you will have enough in this portfolio to cover 4 “years” worth of spending
          </li>
          <li>
            The object of the game is to avoid running out of money, and you will get to keep any money remaining in either portfolio at the conclusion of the game.
          </li>
          <li>
            The game will continue for a number of rounds (“years”?) between 6 and 12, but you will not know in advance how many rounds there will be.
          </li>
          <li>
            The progression for each round will be as follows:
            <ul>
              <li>
                The computer will determine what happens in “the markets” by randomly choosing between two outcomes: in the first outcome, the money in your “growth” portfolio will double, while in the second outcome the “growth” portfolio will be cut in half              </li>
              <li>
                The computer will take $1 from your “paycheck” portfolio to cover your annual spending.
              </li>
              <li>
                You will then have the choice to move money between your two portfolios. You can either 1) move money from the growth portfolio to the paycheck portfolio to cover additional years of spending or 2) move money from the paycheck portfolio to the growth portfolio to take more risk.              </li>
              <li>
                Once you have decided on any shifts between the two portfolios, the game will proceed to the next round.
              </li>
            </ul>
          </li>
        </ul>
        {rulesBtn}
      </div>
    )
  }
}

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    let numRounds = 0;
    for (let i = 0; i < 6; ++i) {
      numRounds += Math.round(Math.random());
    }
    numRounds += 4;

    // Sets states with values for the balance, round, and rounds
    this.state = {
      balance: 8.0,
      potA: 4.0,
      potB: 4.0,
      round: 1,
      rounds: numRounds,
      stage: "rules",
      allocation: 50
    };

    this.spend = this.spend.bind(this);
    this.markets = this.markets.bind(this);
    this.rebalance = this.rebalance.bind(this);
    this.continue = this.continue.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleRebalanceChoice = this.handleRebalanceChoice.bind(this);
    this.handleRebalanceOver = this.handleRebalanceOver.bind(this);
    this.shouldEnd = this.shouldEnd.bind(this);
    this.handleRulesBtn = this.handleRulesBtn.bind(this);
  }

  // Spends $1 of balance (has to be done every round)
  spend() {
    if (this.props.version === 1) {
      this.setState(state => ({ balance: Math.round((state.balance - 1) * 100) / 100 }));
      this.setState(state => ({
        potA: Math.round(state.balance / 2 * 100) / 100,
        potB: Math.round(state.balance / 2 * 100) / 100
      }));
    } else if (this.props.version === 2) {
      this.setState(state => ({
        balance: Math.round((state.balance - 1) * 100) / 100,
        potB: Math.round((state.potB - 1) * 100) / 100
      }));
    }
    this.setState({ stage: "continue" });
  }

  // Simulates action of the markets on your balance
  markets() {
    let result = Math.round(Math.random());
    if (result === 1) {
      this.setState(state => ({ gainOrLoss: state.potA * 0.5 - state.potA, initPotA: state.potA }));
      this.setState(state => ({ potA: state.potA * 0.5 }));
      this.setState(state => ({ balance: state.potA + state.potB }));
    } else {
      this.setState(state => ({ gainOrLoss: state.potA * 2 - state.potA, initPotA: state.potA }));
      this.setState(state => ({  potA: state.potA * 2 }));
      this.setState(state => ({ balance: state.potA + state.potB }));
    }
    this.spend();
  }

  // Rebalances the pot based on the allocation value (ranges from 0 --> 1)
  rebalance() {
    this.setState(state => ({
      potA: Math.round(state.balance * (state.allocation) * 100) / 100,
      potB: Math.round(state.balance * (1 - state.allocation) * 100) / 100
    }));
  }

  // Continue to next round
  continue() {
    this.setState(state => ({
      round: state.round + 1,
      rounds: state.rounds - 1,
      stage: "rebalance"
    }));
  }

  // Checks if should end
  shouldEnd() {
    let end;
    if (this.state.rounds === 1 || this.state.potA <= 0 || this.state.balance <= 0) {
      end = true;
    } else {
      end = false;
    }
    return end;
  }

  // Handles the change to the allocation value when the rebalance slider is moved
  handleSlide(value) {
    this.setState({ allocation: value })
    this.rebalance();
  }

  // Handles the result of the user hitting yes or no to rebalancing
  handleRebalanceChoice(id) {
    if (id === "yes") {
      this.setState({ rebalance: true })
    } else if (id === "no") {
      this.setState({ stage: "markets" });
    }
  }

  // For the button that the user clicks when they are done rebalancing
  handleRebalanceOver() {
    this.setState({ stage: "markets", rebalance: false });
  }

  // For the I understand button that comes after the game rules
  handleRulesBtn() {
    this.setState({ stage: "markets" })
  }

  render() {
    let option;
    let info = <GameInfo version={this.props.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} />;

    if (this.state.stage === "markets") {
      option = <Button variant="danger" onClick={this.markets}>Start Round {this.state.round}</Button>;
    } else if (this.state.stage === "rebalance") {
      option = <RebalanceOptns version={this.props.version} onClick={this.handleRebalanceChoice} showSlider={this.state.rebalance} onSlide={this.handleSlide} done={this.handleRebalanceOver} />;
    } else if (this.state.stage === "continue") {
      if (this.shouldEnd()) {
        let gameData = { ...this.state, fromGame: true }; // info to be passed to end screen
        option = <MarketInfo change={this.state.gainOrLoss} version={this.props.version} potA={this.state.initPotA} shouldEnd={this.shouldEnd} gameData={gameData} continue={this.continue} />;
      } else {
        option = <MarketInfo change={this.state.gainOrLoss} version={this.props.version} potA={this.state.initPotA} shouldEnd={this.shouldEnd} continue={this.continue} />;
      }
    }

    let main;
    if (this.state.stage !== "rules") {
      main = (
        <main>
          {info}
          <div className="option-buttons">
            {option}
          </div>
        </main>
      );
    } else {
      main = (
        <main>
          <GameRules version={this.props.version} onClick={this.handleRulesBtn} />
        </main>
      );
    }

    let title;
    if (this.props.version === 1) {
      title = "Version One: MPT";
    } else if (this.props.version === 2) {
      title = "Version Two: I2O";
    }

    return (
      <div className="game">
        <header>
          <h1 className="title">{title}</h1>
        </header>
        {main}
      </div>
    )
  }
}
