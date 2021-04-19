import { gql, useMutation } from "@apollo/client";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Slider,
} from "@material-ui/core";
import { Competency, CompetencyDescription, Rating } from "./NewReportTypes";

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
      user_id
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

type SliderComponentProps = Rating & {
  compId: number;
  reportId: string;
};

const SliderComponent = ({
  id,
  notes,
  rating,
  user_id,
  compId,
  reportId,
}: SliderComponentProps) => {
  const [saveReport, { data }] = useMutation(SAVE_REPORT);

  const saveReportOnChange = (e: object, value: number | number[]) => {
    saveReport({
      variables: {
        input: {
          rating_id: rating,
          notes: notes,
          competency_id: compId,
          user_id: user_id,
          rating: value,
          matrix_report_id: reportId,
        },
      },
    });
  };

  return (
    <Slider
      defaultValue={3}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      step={1}
      marks
      min={1}
      max={5}
      onChangeCommitted={saveReportOnChange}
      value={rating ?? 3}
    />
  );
};

//TODO: Doesn't work if there is no rating already existing
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
        {ratings &&
          ratings.map((rating) => {
            return <SliderComponent {...rating} {...compId} {...reportId} />;
          })}
      </CardContent>
    </Card>
  );
};

export default CompetencyComponent;
