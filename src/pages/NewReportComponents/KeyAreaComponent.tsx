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

////Advanced version
const KeyAreaComponent = ({ name, attribute }: KeyArea) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {attribute &&
          attribute.map((attributeItem: Attribute) => (
            <AttributeComponent {...attributeItem} />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

// const KeyAreaComponent = ({ name, attribute }: KeyArea) => {
//   return (
//     <div>
//       <Typography variant="h3" component="h3">
//         {name}
//       </Typography>
//       {attribute &&
//         attribute.map((attributeItem: Attribute) => (
//           <AttributeComponent {...attributeItem} />
//         ))}
//     </div>
//   );
// };

export default KeyAreaComponent;