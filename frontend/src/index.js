import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './assets/base.css';
import './assets/components.css';
import App from './components/App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/*' element= {<App/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  </div>
);


