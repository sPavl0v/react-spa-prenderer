import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Article1 = React.lazy(() => import('./pages/blog/Article1'));
const Article2 = React.lazy(() => import('./pages/blog/Article2'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
