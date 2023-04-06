import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContexProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from 'react-auth-kit';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <AuthProvider authType={'cookie'}
          authName={'_auth'}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={(<Login />)} />
              <Route path="/" element={(<Login />)} />
              <Route path="*" element={<p></p>} />
            </Routes>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);


