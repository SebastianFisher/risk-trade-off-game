import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/";
import HomeScreen from "./HomeScreen.jsx";
import GameScreen from "./GameScreen.jsx";
import EndScreen from "./EndScreen.jsx";
import Survey from "./Survey.jsx";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        // <Router>
        //     <div className="retirement-game">
        //         <Switch>
        //             <Route path="/end" component={EndScreen}/>
        //             <Route path="/game-1" >
        //                 <GameScreen version={1} />
        //             </Route>
        //             <Route path="/game-2">
        //                 <GameScreen version={2} />
        //             </Route>
        //             <Route path="/" >
        //                 <HomeScreen />
        //             </Route>
        //         </Switch>
        //     </div>
        // </Router>
        <Survey />
    );
}