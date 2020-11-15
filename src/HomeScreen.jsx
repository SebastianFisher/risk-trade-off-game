import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./HomeScreen.css";


export default class HomeScreen extends React.Component {
    render() {
        return (
            <div className="home-screen">
                <header>
                    <h1>Welcome!</h1>
                </header>
                <Link to="./game-1">
                    <Button variant="danger" className="ver-1-btn"><span className="btn">Version One: MPT</span></Button>
                </Link>
                <Link to="./game-2">
                    <Button variant="danger" className="ver-2-btn"><span className="btn">Version Two: I2O</span></Button>
                </Link>
            </div>
        );
    }
}