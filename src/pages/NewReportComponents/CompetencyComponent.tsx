import React from "react";
import { gql, useMutation } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  RouteComponentProps,
} from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  Typography,
  makeStyles,
  AccordionDetails,
  Card,
  CardActions,
  CardContent,
  Slider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpandMore } from "@material-ui/icons";
import {
  KeyArea,
  Attribute,
  Competency,
  CompetencyDescription,
} from "./NewReportTypes";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CompetencyComponent = ({
  attribute,
  name,
  competency_description,
}: Competency) => {
  return (
    <div>
      {competency_description &&
        competency_description.map(
          (competencyDescItem: CompetencyDescription) => (
            <CompetencyDescComponent
              {...competencyDescItem}
              compName={name}
              attributeTitle={attribute}
            />
          )
        )}
    </div>
  );
};

const SAVE_REPORT = gql`
  mutation saveReport($input: ReportInput) {
    saveReport(input: $input) {
      id
      competency_id
      user_id
      rating
      notes
      matrix_report_id
    }
  }
`;

const CompetencyDescComponent = ({
  attributeTitle,
  compName,
  core,
  description,
}: CompetencyDescription) => {
  const classes = useStyles();

  const [saveReport, { data }] = useMutation(SAVE_REPORT);

  //TODO: Slider saving values, but need to correctly keep state for each of these items and track values.
  const saveReportOnChange = (e: object, value: number | number[]) => {
    saveReport({
      variables: {
        input: {
          matrix_id: 1,
          competency_id: 1,
          user_id: 2,
          rating: value,
        },
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {attributeTitle}
        </Typography>
        <Typography variant="h5" component="h2">
          {compName}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Slider
          defaultValue={3}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          onChangeCommitted={saveReportOnChange}
        />
      </CardContent>
    </Card>
  );
};

export default CompetencyComponent;
