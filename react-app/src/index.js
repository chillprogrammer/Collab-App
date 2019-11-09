import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

// Import Pages
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/NotFound'

const BASE_PAGE = ""

const routing = (
    <Router basename={BASE_PAGE} >
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
            <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
