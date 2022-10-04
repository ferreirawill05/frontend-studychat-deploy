import React from 'react';

import ReactDOM from 'react-dom';
import Login from "./screens/login/login.jsx";
import Chat from "./screens/chat/chat.jsx"
import Cadastro from './screens/cadastro/cadastro.jsx';
import Home from "./screens/home/home.jsx"
import MeusChats from './screens/meus-chats/meus-chats.jsx';
import teste from './screens/chat-mock/teste.jsx'

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';




import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/chat" component={Chat}></Route>
        <Route exact path="/cadastro" component={Cadastro}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/meuschats" component={MeusChats}></Route>
        <Route exact path="/teste" component={teste}></Route>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();