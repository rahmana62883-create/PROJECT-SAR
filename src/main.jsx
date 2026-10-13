import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { AppProvider } from './context/AppContext';
import { ChatProvider } from './context/ChatContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <WalletProvider>
          <AppProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </AppProvider>
        </WalletProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
