import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Article1 from './pages/blog/Article1';
import Article2 from './pages/blog/Article2';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/services" exact component={Services} />
          <Route path="/blog/article1" exact component={Article1} />
          <Route path="/blog/article2" exact component={Article2} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
