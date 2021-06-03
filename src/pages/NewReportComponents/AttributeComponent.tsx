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
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpandMore } from "@material-ui/icons";
import { KeyArea, Attribute, Competency } from "./NewReportTypes";
import CompetencyComponent from "./CompetencyComponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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

type AttributeProps = Attribute & {
  reportId: string;
};

const AttributeComponent = ({ name, competency, reportId }: AttributeProps) => {
  const classes = useStyles();
  return (
    <div>
      {competency &&
        competency.map((competencyItem: Competency) => (
          <CompetencyComponent
            {...competencyItem}
            attribute={name}
            reportId={reportId}
          />
        ))}
    </div>
  );
};

export default AttributeComponent;
