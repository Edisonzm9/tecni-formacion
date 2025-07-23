
export interface Module {
  title: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  commercialName: string;
  code: string;
  area: 'Eléctrica' | 'Mecánica' | 'Formación Transversal' | 'Industrial';
  instructor: string;
  details: {
    totalDuration: string;
    frequency?: string;
    sessionDuration?: string;
    totalHours: string;
    focus: string;
  };
  curriculum: Module[];
}
