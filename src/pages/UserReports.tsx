import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  RouteComponentProps,
} from "react-router-dom";
import { Button } from "@material-ui/core";

type UserReportDetailParams = {
  userId: string;
};

type UserReportProps = RouteComponentProps<UserReportDetailParams>;

const GET_REPORTS_FOR_USER = gql`
  query getReportsForUser($userId: Int) {
    getReportsForUser(userId: $userId) {
      id
      matrix_id
    }
  }
`;

const UserReports = ({ match }: UserReportProps) => {
  const reportUserId = match.params.userId;

  // const { loading, error, data } = useQuery<UserData>(GET_USERS, {
  //   variables: { userId: reportUserId },
  // });

  return (
    <div>
      <p>User reports for id: {match.params.userId}</p>
      <Button component={Link} to={`${match.url}/new/1`}>
        New Report
      </Button>
    </div>
  );
};

export default UserReports;
