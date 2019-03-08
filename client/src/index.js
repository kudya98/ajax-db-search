import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { render } from 'react-dom'


render(
        <BrowserRouter>
            <Switch>
                <Route  path='/users/:number' render={(props) => <App {...props}   />}
                />
            </Switch>
        </BrowserRouter>,
    document.getElementById('root')
);