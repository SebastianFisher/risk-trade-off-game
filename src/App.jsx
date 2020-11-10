import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/";
import HomeScreen from "./HomeScreen.jsx";
import GameScreen from "./GameScreen.jsx";
import EndScreen from "./EndScreen.jsx";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router>
            {/*
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="./">Retirement Game</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="./">Home</Nav.Link>
                        <Nav.Link href="./game-1">Version One: MPT</Nav.Link>
                        <Nav.Link href="./game-2">Version Two: I2O</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            */}
            <div className="retirement-game">
                <Switch>
                    <Route exact path="./retirement-game">
                        <HomeScreen />
                    </Route>
                    <Route path="/game-1">
                        <GameScreen version={1} />
                    </Route>
                    <Route path="/game-2" >
                        <GameScreen version={2} />
                    </Route>
                    <Route path="/end" component={EndScreen}>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}