import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Global styles
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Performance Monitoring Callback
const logPerformance = (metric) => {
  console.log(`[Performance] ${metric.name}:`, metric.value);
  // Send metrics to analytics endpoint if needed
  // e.g., fetch('/analytics', { method: 'POST', body: JSON.stringify(metric) });
};

// React Root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render Application
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Web Vitals Performance Monitoring
reportWebVitals(logPerformance);
