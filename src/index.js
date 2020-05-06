import React from 'react';
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Home} from './components/Home.js';
import {Main} from './components/Main.js';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Home} >
                    <IndexRoute component={Home} />
                    <Route path={"Home"} component={Home} />
                </Route>
                <Route path={"/"} component={Main} >
                    <IndexRoute component={Main} />
                    <Route path={"Main"} component={Main} />
                </Route>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));