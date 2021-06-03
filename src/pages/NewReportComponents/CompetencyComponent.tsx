import { gql, useMutation } from "@apollo/client";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Slider,
  TextField,
  Divider,
  Box,
  Grid,
  Button,
} from "@material-ui/core";
import {
  Competency,
  CompetencyDescription,
  NewRating,
  Rating as RatingType,
} from "./NewReportTypes";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce/lib";
import Rating from "@material-ui/lab/Rating";
import classes from "*.module.css";

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
  card: {
    height: 200,
  },
  // notes: {
  //   height: "100%",
  // },
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
    <>
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
    </>
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
  ratings: [NewRating];
  compId: number;
  compName: string;
  reportId: string;
};

type RatingComponentProps = {
  rating: NewRating;
};

const RatingComponent = ({ rating: initialRating }: RatingComponentProps) => {
  const [saveReport, { data }] = useMutation<NewRating>(SAVE_REPORT, {
    onCompleted: (data: NewRating) => {
      console.log(rating);
      console.log(data);
      // setRating({ ...data });
    },
  });
  // const [note, setNote] = useState(rating?.notes);
  // const [ratingVal, setRatingVal] = useState<number | null>(
  //   rating?.rating ? rating?.rating : 0
  // );
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(-1);
  const debouncedNote = useDebouncedCallback((value) => {
    // setNote(value);
    setRating({ ...rating, notes: value });
  }, 500);

  const saveRating = () => {
    saveReport({
      variables: {
        input: {
          rating_id: rating.id,
          notes: rating.notes,
          competency_id: rating.competency_id,
          rating: rating.rating,
          matrix_report_id: rating.matrix_report_id,
        },
      },
    });
  };

  useEffect(() => {
    if (rating.notes || rating.rating) saveRating();
  }, [rating.notes, rating.rating]);

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

  type labelsType = {
    [key: number]: string;
  };

  const labels: labelsType = {
    1: "Unacceptable",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  return (
    <>
      <Box display="flex" width={1} m={0.5}>
        <Rating
          name="hover-feedback"
          value={rating.rating}
          precision={1}
          onChange={(e, value) => {
            if (value) {
              console.log("value changed");
              return setRating({ ...rating, rating: value });
            } else {
              console.log("value not changed");
              return null;
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {rating.rating !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : rating.rating]}</Box>
        )}
      </Box>

      <TextField
        label="Notes"
        variant="outlined"
        value={rating.notes}
        fullWidth
        onChange={(e) => debouncedNote(e.target.value)}
        multiline
        rows={5}
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

  let emptyRating: NewRating = {
    competency_id: compId,
    matrix_report_id: reportId,
    notes: "",
    rating: 0,
    id: 0,
  };

  return (
    <Box marginTop={2}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={7}>
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
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs={4}>
              {ratings.length > 0 ? (
                ratings.map((rating) => {
                  return <RatingComponent rating={rating} />;
                })
              ) : (
                <RatingComponent rating={emptyRating} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompetencyComponent;
