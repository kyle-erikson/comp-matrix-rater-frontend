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
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpandMore } from "@material-ui/icons";
import { KeyArea, Attribute } from "./NewReportTypes";
import AttributeComponent from "./AttributeComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

type KeyAreaProps = KeyArea & {
  reportId: string;
};

////Advanced version
const KeyAreaComponent = ({ name, attribute, reportId }: KeyAreaProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      {attribute &&
        attribute.map((attributeItem: Attribute) => (
          <Grid item sm={6}>
            <AttributeComponent {...attributeItem} reportId={reportId} />
          </Grid>
        ))}
    </Grid>
  );
};

export default KeyAreaComponent;
