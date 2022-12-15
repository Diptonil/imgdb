import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './assets/base.css';
import './assets/components.css';
import Home from './components/home';
import Login from './components/login'
import Signup from './components/signup'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={ <Login />} />
      </Routes>
    </Router>
  </div>
);


