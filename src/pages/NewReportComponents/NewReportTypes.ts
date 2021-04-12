type BaseReport = {
  getBaseReportForUser: [KeyArea];
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
  attribute: string;
  name: string;
  competency_description: [CompetencyDescription];
};

type CompetencyDescription = {
  attributeTitle: string;
  compName: string;
  core: boolean;
  description: string;
};

export type {
  BaseReport,
  KeyArea,
  Attribute,
  Competency,
  CompetencyDescription,
};
