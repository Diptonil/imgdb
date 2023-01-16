import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/base.css';
import './assets/components.css';
import App from './components/App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </div>
);


