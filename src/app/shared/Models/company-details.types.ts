import { JobDetails } from "./job.type";


export interface CompanyDetails {
    companyName: string;
    address: string;
    employeesCount: number;
    reviewsCount: number;
    reviews: CompanyReview[];
    openings: JobDetails[];
    companyType: string;
    followerCount: number;
    about: string;
    location:string,
    industry:string,
    HRDetails?:HRDetails,
    logoUrl:string,
    totalReviewRating:number
}

interface HRDetails{
    name:string,
    email:string,
    phoneNumber:string,
    linkedInPage?:string
}

interface CompanyReview{
    username:string,
    reviewText:string,
    reviewScore:number,
    reviewedDate:string,
}

