import React from "react";
import { gql, useQuery } from "@apollo/client";
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

const CompetencyDescComponent = ({
  attributeTitle,
  compName,
  core,
  description,
}: CompetencyDescription) => {
  const classes = useStyles();
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
      </CardContent>
    </Card>
  );
};

export default CompetencyComponent;
