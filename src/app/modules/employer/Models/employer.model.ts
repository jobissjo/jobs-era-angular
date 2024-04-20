// Define an interface for the form data
export interface EmployerProfileType {
    personalInformation: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      phoneNumber: string;
      password: string;
      cPassword: string;
      position: string;
      socialMediaLink: string;
      gender: string;
    };
    companyInformation: {
      companyName: string;
      industry: string;
      companySize: string;
      businessType: string;
      companyPhoneNumber: string;
      companyWebsite: string;
      socialMediaLink: string;
      desc: string;
      address: {
        street: string;
        city: string;
        landmark: string;
        state: string;
        country: string;
        postalCode: string;
      };
    };
    additionalInformation: {
      hearAboutUs: string;
      agreedToTerms: string;
    };
  }
  