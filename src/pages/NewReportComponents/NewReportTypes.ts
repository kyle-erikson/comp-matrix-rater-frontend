type Report = {
  getReport: [KeyArea];
};

type NewReport = {
  id: Number;
  reports: [KeyArea];
};

type KeyArea = {
  name: string;
  attribute: [Attribute];
};

type Attribute = {
  name: string;
  competency: [Competency];
};

type Competency = {
  id: number;
  attribute: string;
  name: string;
  competency_description: [CompetencyDescription];
  rating: [NewRating];
};

type Rating = {
  id: number;
  notes: string;
  rating: number;
};

type NewRating = {
  id: number;
  competency_id: number;
  rating: number;
  notes?: String;
  matrix_report_id: String;
};

type CompetencyDescription = {
  attributeTitle: string;
  core: boolean;
  description: string;
};

export type {
  Report,
  KeyArea,
  Attribute,
  Competency,
  CompetencyDescription,
  NewReport,
  Rating,
  NewRating,
};
