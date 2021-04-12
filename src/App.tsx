import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserReports from "./pages/UserReports";
import NewReport from "./pages/NewReport";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact component={Users} />
        <Route path="/users/:userId" component={UserReports} />
        <Route path="/users/:userId/new/:matrixId" component={NewReport} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
