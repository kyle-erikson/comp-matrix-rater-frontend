import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";

const GET_REPORTS = gql`
  query getReports($managerId: Int) {
    getReports(managerId: $managerId) {
      id
      name
      email
      manager_id
    }
  }
`;

function Reports() {
  const { loading, error, data } = useQuery(GET_REPORTS, {
    variables: { managerId: 1 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return <p>{data.getReports.name}</p>;
}

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Reports />
      </div>
    </ApolloProvider>
  );
}

export default App;
