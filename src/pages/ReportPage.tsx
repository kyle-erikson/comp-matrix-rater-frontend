import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "react-router-dom";
import { Report, KeyArea } from "./NewReportComponents/NewReportTypes";
import KeyAreaComponent from "./NewReportComponents/KeyAreaComponent";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

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
            rating
            notes
          }
        }
      }
    }
  }
`;

const ReportPage = ({ match }: ReportPageProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const { loading, error, data } = useQuery<Report>(GET_REPORT, {
    variables: {
      reportId: match.params.reportId,
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {data &&
        data.getReport.map((keyArea: KeyArea, index) => (
          <Step key={index}>
            <StepLabel>{keyArea.name}</StepLabel>
            <StepContent>
              <KeyAreaComponent {...keyArea} reportId={match.params.reportId} />
              <div>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === data.getReport.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
    </Stepper>
  );
};

export default ReportPage;
