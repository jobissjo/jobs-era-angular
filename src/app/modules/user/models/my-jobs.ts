
export interface MyJobs {
  status: string,
  position: string,
  company: string,
  place: string,
  appliedCount: number,
  appliedOn: string
}
interface PersonalDetail {
  name: string,
  heading: string,
  email: string,
  phoneNumber: string,
  dob?:Date,
  gender?:string,
  socialMediaLink?: string,
  githubLink?: string,
  country: string,
  state: string,
  district: string,
  postalCode?: string
}
export interface UserDetail {
  userId:string,
  profileId?:string,
  personalDetail: PersonalDetail,
  education: EducationType[];
  certifications: CertificationType[];
  skills: string[]; 
  experience: Experience[];
  knownLanguages: Language[];
  preferredLocations: string[];
  otherPreference: OtherPreference
}

interface OtherPreference{
  jobType:string
}

export interface EducationType {
  level: string;
  fieldOfStudy: string;
  startedDate: Date;
  endedDate: Date;
}

interface CertificationType {
  title: string;
  certificateId: string;
  mode: string;
  institution: string;
  startDate: Date;
  endDate: Date;
}

interface Experience {
  position: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
}

interface Language {
  language: string;
  level: string;
  reading: boolean;
  writing: boolean;
  speaking: boolean;
}
