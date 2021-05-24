import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import Annotation from './views/annotation';

function App() {
    return (
        <Router>
            <Route exact path="/" component={Annotation} />
        </Router>
    );
}

export default hot(App);