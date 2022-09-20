import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { KanjisList, KanjisInsert, KanjisUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/kanjis/list" exact component={KanjisList} />
                <Route path="/kanjis/create" exact component={KanjisInsert} />
                <Route
                    path="/kanjis/update/:id"
                    exact
                    component={KanjisUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App