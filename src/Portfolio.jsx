import React from 'react';
import "./Portfolio.css";
import up from "./images/up-arrow.png";
import down from "./images/down-arrow.png";

export default function Portfolio(props) {
    // Initialize an arrow to nothing currently (in the case that no increase has been made)
    let arrow = null;
    let animation = "arrowIn 0.5s ease-in forwards";
    // Create var for the arrow depending on market result prop
    const result = props.result;
    if (result === "increase") {
        arrow = <img src={up} alt="result arrow" style={{ animation }} />;
    } else if (result === "decrease") {
        arrow = <img src={down} alt="result arrow" style={{ animation }} />;
    } else {
        arrow = null;
    }
    // create a div for allocation balances if needed
    let allocation;
    if (props.equities) {
        allocation = (
            <div className="allocation">
                <div className="equities">
                    <strong style={{ fontSize: "16px" }}>Equities </strong><br />
                    ${props.equities.toFixed(2)}
                </div>
                <div className="cash">
                    <strong style={{ fontSize: "16px" }}>Cash </strong><br />
                    ${props.cash.toFixed(2)}
                </div>
            </div>
        )
    } else {
        allocation = null;
    }

    /*
    CSS notes: for header of portfolio, set overflow to hidden so the background color fits
    inside border radius
    - font-size: 24 and set smaller font inside to 50% maybe?
    Can use box-sizing: border-box (default is content-box) to ensure that width and height stay what they are set to
      - This contains the padding and border INSIDE the width/height
    BIG limitation of box model: 
      - dimensions are affected by the border and padding. using the border-box model fixes this
    */

    // Change the class name for the balance div depending on whether allocation will be displayed
    let balClassName = "balance";
    if (props.equities) {
        balClassName = "balance-shared";
    }
    console.log(balClassName);

    // variable for the version to help with formatting
    const version = props.equities ? "one" : "two";

    return (
        <div className={"portfolio " + version}>
            <div className="name">
                {props.title}
            </div>
            <div className="content">
                <div className={balClassName}>
                    <strong style={{ fontSize: "22px" }}>Balance:</strong><br />
                    ${props.balance.toFixed(2)} {arrow}
                </div>
                {allocation}
            </div>
        </div>
    );
}