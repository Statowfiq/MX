import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

function App() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    resolvers: {}
  });

  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App;
