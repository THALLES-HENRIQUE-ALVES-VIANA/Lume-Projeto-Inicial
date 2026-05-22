import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import AppCrashFallback from './components/common/app-crash-fallback';
import AppErrorBoundary from './components/common/app-error-boundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppErrorBoundary fallback={AppCrashFallback}>
        <App />
      </AppErrorBoundary>
    </HashRouter>
  </React.StrictMode>
  
);
