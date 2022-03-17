import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import List_of_currencies from "./pages/list_of_currencies/List_of_currencies";
import TheEnvelope from "./pages/theEnvelope/TheEnvelope";

const App = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-around mt-3">
                <Link to="/List_of_currencies">
            <button type="button" className="btn btn-outline-primary">Список валют</button>
                </Link>
                <Link to="/TheEnvelope">
            <button type="button" className="btn btn-outline-success">Конвертер</button>
                </Link>

            </div>
            <Switch>
                <Route exact path='/List_of_currencies' component={List_of_currencies}/>
                <Route exact path='/TheEnvelope' component={TheEnvelope}/>
            </Switch>
        </div>
    );
};

export default App;