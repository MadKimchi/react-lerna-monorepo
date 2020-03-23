import ApolloClient from 'apollo-boost';

export const graphClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
});