import React from 'react';
import "./RebalanceSlider.css";

export default class RebalanceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleSlide = this.handleSlide.bind(this);
    }

    // Changes parent state based on how slider is moved
    handleSlide(e) {
        this.props.onSlide(e.target.value);
    }

    render() {
        return (
            <div className="slide-container">
                <input className="slider" type="range" min="0.25" max="0.75" step="0.0025" value={this.props.allocation} onChange={this.handleSlide} />
                <br />
                <p>{this.props.allocation}</p>
            </div>
        )
    }
}