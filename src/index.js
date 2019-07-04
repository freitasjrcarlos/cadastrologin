import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FormCadastro from './components/FormCadastro';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/" exact={true} component={App} />
    <Route path="/FormCadastro" component={FormCadastro} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//404 <Route path='*' component={ComponenteDePagina404} />

