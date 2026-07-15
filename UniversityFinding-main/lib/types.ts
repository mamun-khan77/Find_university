export interface Program {
  id: string;
  name: string;
  degree: string;
  faculty: string;
  credits: number;
  duration: string;
  tuitionPerCredit: number;
  admissionFee: number;
  labFee: number;
  libraryFee: number;
  otherFee: number;
  scholarshipAvailable: boolean;
  minCgpa: number;
  intakeSeasons: string[];
  weekend: boolean;
  online: boolean;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  date: string;
  rating: number;
  categories: {
    teachers: number;
    campus: number;
    labs: number;
    environment: number;
    career: number;
    library: number;
  };
  text: string;
}

export interface Scholarship {
  id: string;
  name: string;
  type: string;
  waiver: string;
  condition: string;
  minCgpa: number;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  logoColor: string;
  established: number;
  ugcApproved: boolean;
  type: 'Private' | 'Public';
  permanentCampus: boolean;
  city: string;
  address: string;
  website: string;
  phone: string;
  email: string;
  viceChancellor: string;
  students: number;
  faculty: number;
  campusArea: string;
  semesterSystem: string;
  iebAccredited: boolean;
  iebDepartments: string[];
  ranking: number;
  qsRanking: string;
  tuitionRange: [number, number];
  hasHostel: boolean;
  hasTransport: boolean;
  hasScholarship: boolean;
  socialLinks: { facebook?: string; linkedin?: string };
  programs: Program[];
  scholarships: Scholarship[];
  reviews: Review[];
  facilities: string[];
  clubs: string[];
  careerStats: {
    employmentRate: number;
    topRecruiters: string[];
    averageSalary: string;
    internshipSupport: boolean;
  };
  dataSources: {
    source: string;
    lastUpdated: string;
    verified: boolean;
  };
  description: string;
  campusImages: string[];
}

export const allCities = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Sylhet',
  'Khulna',
  'Comilla',
  'Rangpur',
  'Barishal',
  'Mymensingh',
  'Gazipur',
  'Bogura',
  'Narayanganj',
];

export const programCategories = [
  'Engineering',
  'Business',
  'Science',
  'Arts',
  'Law',
  'Architecture',
  'Medical',
  'Computer Science',
];
