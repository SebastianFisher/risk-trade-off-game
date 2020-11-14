import React from 'react';
import './GameScreen.css';
import Button from "react-bootstrap/Button";
import RebalanceSlider from "./RebalanceSlider.jsx";
import pic1 from "./images/market-increase.png";
import pic2 from "./images/market-decrease.png";
import Portfolio from "./Portfolio.jsx";

const Link = require("react-router-dom").Link;

// Possibly change model of returns, maybe have a list of years of 
// returns that can be chosen from at random
// Practice round with more commentary?
// Need more explanation? It's hard to weigh the probabilities
// Change wording of rules (mention probability?)
// Should have more framing (i.e. advice after the market action occurs)
// Also maybe change the game screen so that one has a singular portfolio and the other has two
// Figure out how we can "game" the system and give people a random but chosen scenario for the markets



function RebalanceOptns(props) {
  let slider;
  let choices;
  let message = props.version === 1 ? "Would you like to change the allocation in your portfolio before the next round?" : "Would you like to move money between portfolios before the next round?";
  if (props.showSlider) {
    choices = null;
    slider = (
      <div id="rebalance-slide">
        <RebalanceSlider onSlide={props.onSlide} potA={props.potA} balance={props.balance} /> <br />
        <Button id="done-rebalancing" variant="danger" onClick={props.done}>Done Rebalancing</Button>
      </div>);
  } else {
    choices = (
      <div id="choices-container">
        <label id="rebalance-q" htmlFor="choices">{message}</label>
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
      <div className="info">
        <Portfolio balance={props.balance} result={props.marketResult} title={"Investment Portfolio"} equities={props.potA} cash={props.potB} />
        <p style={{ fontSize: 22 }}>
          Round: {props.round}<br />
        </p>
      </div>
    );
  } else if (props.version === 2) {
    return (
      <div clasName="info">
        <Portfolio balance={props.potA} result={props.marketResult} title={"Growth Portfolio"} />
        <Portfolio balance={props.potB} title={"Spending Portfolio"} result={props.spendResult} />
        <p style={{ fontSize: 22 }}>
          Round: {props.round}<br />
          Total Wealth: ${props.balance.toFixed(2)}<br />
        </p>
      </div>
    );
  }
}

function MarketInfo(props) {
  let result;
  let increased = props.change > 0;
  let newPotA = props.potA + props.change;
  if (increased) {
    result = `Hooray! The markets went up and your equities increased in value from $${props.potA.toFixed(2)} to $${newPotA.toFixed(2)}. `
  } else {
    result = `Uh oh! The markets went down and your equities decreased in value from $${props.potA.toFixed(2)} to $${newPotA.toFixed(2)}. `
  }

  let increaseOrDecrease = increased ? 'increase' : 'decrease';
  let info;
  if (props.version === 1) {
    info = `After the market ${increaseOrDecrease}, $1 was taken from your portfolio to account for living expenses. Then, your portfolio was rebalanced to a 50/50 allocation according to Modern Portfolio Theory.`
  } else {
    info = `After the market ${increaseOrDecrease}, $1 was taken from your spending portfolio. Your current portfolio balances are shown above.`
  }

  let bgImage = increased ? pic1 : pic2;
  return (
    <div>
      <div className="market-info">
        <img src={bgImage} alt={`market ${increaseOrDecrease}`} />
        <p id="market-info-results">{result}{info}</p>
      </div>
      <ContinueBtn onClick={props.continue} end={props.shouldEnd} info={props.gameData} />
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
            {"At the start of the game you will have a portfolio worth $6. " +
              "Half of the portfolio will be invested in stocks, and the other half will be in cash."}
          </li>
          <li>
            {"The object of the game is to avoid running out of money, and you will get to keep any money " +
              "remaining in your portfolio at the conclusion of the game."}
          </li>
          <li>
            {"The game will continue for a number of \"years\" between 4 and 10, " +
              "but you will not know in advance how many rounds there will be."}
          </li>
          <li>
            The progression for each round will be as follows:
            <ul>
              <li>
                {"The computer will determine what happens in “the markets” by randomly choosing between two outcomes: " +
                  "in the first outcome, the money in your portfolio that is allocated to stocks will double, while in the second outcome the stocks portion of the portfolio will be cut in half"}
              </li>
              <li>
                Regardless of what happens in the markets, the computer will take $1 from your portfolio to cover your annual spending
              </li>
              <li>
                {"The computer will then “rebalance” your portfolio. " +
                  "The initial default for the rebalancing will be to allocate the portfolio equally between stocks and cash, but in each round you will have the option to adjust the default allocation up to 25% in either direction (i.e. between 25% cash/ 75% stocks and 75% cash /25% equities)"}
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
            {"At the start of the game you will have two portfolios, a “paycheck” portfolio with $3 and a “growth” portfolio, " +
              "also with $3. The purpose of the paycheck portfolio is to finance your “annual” spending of $1, which means that " +
              "at the outset you will have enough in this portfolio to cover 3 “years” worth of spending"}
          </li>
          <li>
            {"The object of the game is to avoid running out of money, and you will " +
              "get to keep any money remaining in either portfolio at the conclusion of the game."}
          </li>
          <li>
            {"The game will continue for a number of \"years\" between 4 and 10, " +
              "but you will not know in advance how many rounds there will be."}
          </li>
          <li>
            The progression for each round will be as follows:
            <ul>
              <li>
                {"The computer will determine what happens in “the markets” by randomly choosing between two outcomes: " +
                  "in the first outcome, the money in your “growth” portfolio will double, while in the second outcome " +
                  "the \"growth\" portfolio will be cut in half"}
              </li>
              <li>
                The computer will take $1 from your spending portfolio to cover your annual spending.
              </li>
              <li>
                {"You will then have the choice to move money between your two portfolios. You can either 1) " +
                  "move money from the growth portfolio to the paycheck portfolio to cover additional years of spending or 2)" +
                  " move money from the paycheck portfolio to the growth portfolio to take more risk."}
              </li>
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

// Container component for the info so I can include a loading animation (not sure if there's another way to do this)
class GameOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loading: true };
  }

  componentDidMount() {
    this.demoAsyncCall().then(this.setState({ loading: false }));
  }

  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      this.props.option
    )

  }
}

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    let numRounds = 4;
    for (let i = 0; i < 6; ++i) {
      numRounds += Math.round(Math.random());
    }

    // Sets states with values for the balance, round, and rounds
    this.state = {
      balance: 6.0,
      potA: 3.0,
      potB: 3.0,
      round: 1,
      roundsLeft: numRounds,
      stage: "rules",
      allocation: 50,
      gameData: []
    };

    // Bind necessary class methods
    this.spend = this.spend.bind(this);
    this.markets = this.markets.bind(this);
    this.rebalance = this.rebalance.bind(this);
    this.continue = this.continue.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleRebalanceChoice = this.handleRebalanceChoice.bind(this);
    this.handleRebalanceOver = this.handleRebalanceOver.bind(this);
    this.shouldEnd = this.shouldEnd.bind(this);
    this.handleRulesBtn = this.handleRulesBtn.bind(this);
    this.addRoundData = this.addRoundData.bind(this);
    this.addRoundDataCheckEnd = this.addRoundDataCheckEnd.bind(this);
  }

  // Method for adding the data from a round to the state at the end of the round, 
  // but checks if the game should end and does necessary updates if so
  addRoundDataCheckEnd() {
    if (this.shouldEnd()[0]) {
      this.setState({
        userDidRebalance: "N/A"
      });
      this.addRoundData();
    }
  }

  // Function for adding the round data (doesn't including checking if the game should end)
  addRoundData() {
    this.setState(state => {
      const gameData = state.gameData.concat({
        round: state.round,
        initPotA: state.initPotA,
        initPotB: state.initPotB,
        marketResult: state.gainOrLoss > 0 ? "Increase" : "Decrease",
        marketGainOrLoss: state.gainOrLoss,
        potAAfterMarket: state.potAAfterMarket,
        potBAfterSpend: Number.parseFloat(state.potBAfterSpend.toFixed(2)),
        userDidRebalance: state.userDidRebalance,
        potAFinal: state.potA,
        potBFinal: state.potB
      });

      return {
        gameData: gameData
      }
    });
  }

  // Spends $1 of balance (done every round)
  spend() {
    this.setState(state => ({
      initPotB: state.potB,
      potBAfterSpend: state.potB - 1,
      spendResult: "decrease"
    }));
    if (this.props.version === 1) {
      this.setState(state => {
        return { balance: Number.parseFloat((state.balance - 1).toFixed(2)) }
      });
      this.setState(
        state => ({
          potA: Math.ceil(state.balance / 2 * 100) / 100,
          potB: Math.floor(state.balance / 2 * 100) / 100
        }),
        // Saves the round data to state, but will only happen if the game should end after
        // this market/spending cycle
        this.addRoundDataCheckEnd
      );
    } else if (this.props.version === 2) {
      this.setState(
        state => ({
          balance: Number.parseFloat((state.balance - 1).toFixed(2)),
          potB: Number.parseFloat((state.potB - 1).toFixed(2))
        }),
        // Saves the round data to state, but will only happen if the game should end after
        // this market/spending cycle
        this.addRoundDataCheckEnd
      );
    }
  }

  // Simulates action of the markets on your balance
  markets() {

    // Simulate action of the market and create a state property for the result
    let result = Math.round(Math.random());
    this.setState({ marketResult: result === 0 ? "increase" : "decrease" });

    let change;
    if (result === 1) {
      change = 0.5;
    } else {
      change = 2;
    }

    // update appropriate values in state for the market result
    this.setState(state => ({
      gainOrLoss: Number.parseFloat((state.potA * change - state.potA).toFixed(2)),
      potA: Number.parseFloat((state.potA * change).toFixed(2)),
      initPotA: state.potA,
      potAAfterMarket: state.potA + Number.parseFloat((state.potA * change - state.potA).toFixed(2))
    }));
    this.setState(state => ({ balance: state.potA + state.potB }));

    // Set the state to continue and call the spend method 
    this.spend();
    this.setState({ stage: "continue" });
  }

  // Rebalances the pot based on the allocation value (ranges from 0.25 --> 0.75)
  rebalance() {
    this.setState(state => ({
      potA: Number(state.allocation),
      potB: Number(state.balance - state.allocation)
    }));
  }

  // Continue to the rebalance phase
  continue() {
    // Change marketResult so that no arrow is displayed in the portfolio
    this.setState({ marketResult: "n/a", spendResult: "n/a" });

    this.setState({ stage: "rebalance" });
  }

  // Checks if should end
  shouldEnd() {
    let end;
    let result = undefined;
    if (this.state.roundsLeft <= 1 || this.state.balance <= 0) {
      if (this.state.balance >= 0) {
        result = "success";
      } else {
        result = "failed";
      }
      end = true;
    } else {
      end = false;
      result = undefined;
    }

    return [end, result];
  }

  // Handles the change to the allocation value when the rebalance slider is moved
  handleSlide(value) {
    this.setState({ allocation: value })
    this.rebalance();
  }

  // Handles the result of the user hitting yes or no to rebalancing
  handleRebalanceChoice(id) {
    if (id === "yes") {
      // sets the states needed for user to rebalance
      this.setState({
        rebalance: true,
        userDidRebalance: "Yes"
      });
    } else if (id === "no") {
      this.setState({ userDidRebalance: "No" });
      // Call function to end rebalancing
      this.handleRebalanceOver();
    }
  }

  // For the button that the user clicks when they are done rebalancing
  handleRebalanceOver() {
    // Adds round data to the array in state after the user clicks done rebalancing
    this.addRoundData();

    this.setState(state => ({
      stage: "markets",
      round: state.round + 1,
      roundsLeft: state.roundsLeft - 1,
      rebalance: false
    }));
  }

  // For the I understand button that comes after the game rules
  handleRulesBtn() {
    this.setState({ stage: "markets" })
  }

  render() {
    let option;
    let info = <GameInfo version={this.props.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} />;

    if (this.state.stage === "markets") {
      option = <Button variant="danger" onClick={this.markets}>Start Round {this.state.round}</Button>;
    } else if (this.state.stage === "rebalance") {
      option = <RebalanceOptns version={this.props.version} onClick={this.handleRebalanceChoice} showSlider={this.state.rebalance} onSlide={this.handleSlide} done={this.handleRebalanceOver} potA={this.state.potA} balance={this.state.balance} />;
    } else if (this.state.stage === "continue") {
      let endData = this.shouldEnd();
      let end = endData[0];
      let result = endData[1];
      if (end) {
        let gameInfo = { gameData: this.state.gameData, result: result, version: this.props.version }; // info to be passed to end screen
        option = <MarketInfo change={this.state.gainOrLoss} version={this.props.version} potA={this.state.initPotA} shouldEnd={end} gameData={gameInfo} continue={this.continue} />;
      } else {
        option = <MarketInfo change={this.state.gainOrLoss} version={this.props.version} potA={this.state.initPotA} continue={this.continue} />;
      }
    }

    let main;
    if (this.state.stage !== "rules") {
      main = (
        <main>
          {info}
          <div className="loader option-buttons">
            <GameOptions option={option} />
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
