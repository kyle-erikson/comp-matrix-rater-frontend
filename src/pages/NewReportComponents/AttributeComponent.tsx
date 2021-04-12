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
import { KeyArea, Attribute, Competency } from "./NewReportTypes";
import CompetencyComponent from "./CompetencyComponent";

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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));

// const AttributeComponent = ({ name, competency }: Attribute) => {
//   const classes = useStyles();

//   return (
//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography className={classes.heading}>{name}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {competency &&
//           competency.map((competencyItem: Competency) => (
//             <CompetencyComponent {...competencyItem} />
//           ))}
//       </AccordionDetails>
//     </Accordion>
//   );
// };

const AttributeComponent = ({ name, competency }: Attribute) => {
  const classes = useStyles();
  return (
    <div>
      {competency &&
        competency.map((competencyItem: Competency) => (
          <CompetencyComponent {...competencyItem} attribute={name} />
        ))}
    </div>
  );
};

export default AttributeComponent;
