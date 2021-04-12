import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { BaseReport, KeyArea } from "./NewReportComponents/NewReportTypes";
import KeyAreaComponent from "./NewReportComponents/KeyAreaComponent";

type NewReportDetailParams = {
  userId: string;
  matrixId: string;
};

type NewReportProps = RouteComponentProps<NewReportDetailParams>;

const GET_BASE_REPORT_FOR_USER = gql`
  query getBaseReportForUser($userId: String, $matrixId: String) {
    getBaseReportForUser(userId: $userId, matrixId: $matrixId) {
      name
      attribute {
        name
        competency {
          name
          competency_description {
            core
            description
          }
        }
      }
    }
  }
`;

const NewReport = ({ match }: NewReportProps) => {
  const { loading, error, data } = useQuery<BaseReport>(
    GET_BASE_REPORT_FOR_USER,
    {
      variables: {
        userId: match.params.userId,
        matrixId: match.params.matrixId,
      },
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return (
    <div>
      {data &&
        data.getBaseReportForUser.map((keyArea: KeyArea) => (
          <KeyAreaComponent {...keyArea} />
        ))}
    </div>
  );
};

export default NewReport;
