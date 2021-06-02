import { gql, useMutation } from "@apollo/client";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Slider,
  TextField,
} from "@material-ui/core";
import { Competency, CompetencyDescription, Rating } from "./NewReportTypes";
import { useState } from "react";

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

type CompetencyProps = Competency & {
  reportId: string;
};

const CompetencyComponent = ({
  id,
  attribute,
  name,
  competency_description,
  rating,
  reportId,
}: CompetencyProps) => {
  return (
    <div>
      {competency_description &&
        competency_description.map(
          (competencyDescItem: CompetencyDescription) => (
            <CompetencyDescComponent
              {...competencyDescItem}
              compId={id}
              compName={name}
              attributeTitle={attribute}
              ratings={rating}
              reportId={reportId}
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
      rating
      notes
      matrix_report_id
    }
  }
`;

type CompDescComponent = CompetencyDescription & {
  ratings: [Rating];
  compId: number;
  compName: string;
  reportId: string;
};

type RatingComponentProps = {
  rating?: Rating;
  compId: number;
  reportId: string;
};

const RatingComponent = ({
  rating,
  compId,
  reportId,
}: RatingComponentProps) => {
  const [saveReport, { data }] = useMutation(SAVE_REPORT);
  const [note, setNote] = useState("");

  const saveReportOnChange = (e: object, value: number | number[]) => {
    saveReport({
      variables: {
        input: {
          rating_id: rating ? rating.id : 0,
          notes: rating ? rating.notes : "",
          competency_id: compId,
          rating: value,
          matrix_report_id: reportId,
        },
      },
    });
  };

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "",
    },
    {
      value: 3,
      label: "",
    },
    {
      value: 4,
      label: "",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  return (
    <>
      <Slider
        defaultValue={3}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={1}
        max={5}
        onChangeCommitted={saveReportOnChange}
        value={rating?.rating}
      />
      <TextField
        label="Notes"
        variant="outlined"
        value={rating?.notes}
        fullWidth
        onChange={(e) => setNote(e.target.value)}
      />
    </>
  );
};

const CompetencyDescComponent = ({
  attributeTitle,
  compId,
  compName,
  core,
  description,
  ratings,
  reportId,
}: CompDescComponent) => {
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
        {ratings.length > 0 ? (
          ratings.map((rating) => {
            return (
              <RatingComponent
                rating={rating}
                compId={compId}
                reportId={reportId}
              />
            );
          })
        ) : (
          <RatingComponent compId={compId} reportId={reportId} />
        )}
      </CardContent>
    </Card>
  );
};

export default CompetencyComponent;
