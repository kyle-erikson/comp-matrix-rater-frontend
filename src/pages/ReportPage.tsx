import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Report, KeyArea } from "./NewReportComponents/NewReportTypes";
import KeyAreaComponent from "./NewReportComponents/KeyAreaComponent";

type ReportPageParams = {
  reportId: string;
};

type ReportPageProps = RouteComponentProps<ReportPageParams>;

const GET_REPORT = gql`
  query getReport($reportId: String) {
    getReport(reportId: $reportId) {
      name
      attribute {
        name
        competency {
          id
          name
          competency_description {
            core
            description
          }
          rating {
            id
            user_id
            rating
            notes
          }
        }
      }
    }
  }
`;

const ReportPage = ({ match }: ReportPageProps) => {
  const { loading, error, data } = useQuery<Report>(GET_REPORT, {
    variables: {
      reportId: match.params.reportId,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return (
    <div>
      {data &&
        data.getReport.map((keyArea: KeyArea) => (
          <KeyAreaComponent {...keyArea} reportId={match.params.reportId} />
        ))}
    </div>
  );
};

export default ReportPage;
