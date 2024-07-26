// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AllProducts} />
        <Route path="/product/:id" component={ProductDetail} />
      </Switch>
    </Router>
  );
}

export default App;
