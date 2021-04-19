import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./pages/Users";
import UserReports from "./pages/UserReports";
import NewReport from "./pages/ReportPage";
import ReportPage from "./pages/ReportPage";
import HomePage from "./pages/HomePage";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/reports/:reportId" component={ReportPage} />
        <Route path="/users/:userId" component={UserReports} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
