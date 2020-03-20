import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { graphClient } from './core/https/graph/graph-client'
import './App.css';

const App = () => {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="App">
      <ApolloProvider client={graphClient}>
        <div>
          <h2>My first Apollo app 🚀</h2>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
