import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
