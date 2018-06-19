import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import WalletWithBlocks from 'pages/WalletWithBlocks';
import store from './redux/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={WalletWithBlocks} />
        </Router>
      </Provider>
    );
  }
}

export default App;
