import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyDetails } from 'src/app/shared/Models/company-details.types';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailService {

  constructor() { }
  selectCompanyDetailObs$ = new Subject<CompanyDetails>()

  details: CompanyDetails[] = [{
    companyName: "ABC Corporation",
    address: "123 Main St, City vile",
    employeesCount: 100,
    reviewsCount: 50,
    totalReviewRating: 4,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [
      {
        id:'123',
        jobTitle: "Data Analyst",
        company: "Data Analytics Co.",
        experience: "2+ years",
        qualifications: ["Bachelor's degree in Statistics or related field", "Proficiency in SQL and Python"],
        salary: "$60,000 - $80,000",
        location: "New York, NY",
        jobType: "Full-time",
        shift: "Day",
        skills:['django','dfs'],
        description: ["We are looking for a skilled Data Analyst to join our team.", "The ideal candidate will have experience with data visualization and analysis."],
    },
    
    ],
    companyType: "Tech",
    followerCount: 200,
    about: "ABC Corporation is a leading tech company specializing in software development.",
    location: "Trivandrum",
    industry: "Information technology",
    logoUrl: "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    HRDetails:{
      name: 'Hiring Manager',
      email: "whatever@mail.com",
      phoneNumber: '+91 1234567890',
      linkedInPage: 'linkedin/@whatever'
    }
  },
  {
    companyName: "XYZ Industries",
    address: "456 Elm St, Townsville",
    employeesCount: 500,
    reviewsCount: 80,
    totalReviewRating: 4.5,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [],
    companyType: "Manufacturing",
    followerCount: 1000,
    about: "XYZ Industries is a global manufacturing company known for its innovative products.",
    location: "Trivandrum",
    industry: "Information technology",
    logoUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUTEhAQEhUSEhIVEhUWEBUWEhIXFxEXGBUSFRcYHSggGBolGxgXITEhMSkrLi4uFx8zODMvNygtLisBCgoKDg0OGxAQGyslIB8yLS0yNzUtMC8tLS0tLS0tLS0rNS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAYDBQcBAv/EAEUQAAIBAgEIBgcECAQHAAAAAAABAgMRBAUGEiExQVFxIjJhgZGhBxNCUnKx0WKCksEjM0NUk6Ky8BZTwtIUFRdjZOHi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQIBBv/EAC0RAAICAgIBAgQFBQEAAAAAAAABAgMEESExEhNBBTJRYSKBkaGxFHHR8PFC/9oADAMBAAIRAxEAPwDrgAPTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGpy/nBRwkbzelNroU0+lLtfurtPYxcnpHMpKK2zaydldtJLa3sXMrmVM9cLSuoSdeS3U7aHfPZ4XKFlvOGvin05aMN1OOqC5+8+1moNCrCXczMt+IPqtFtxuf2Jl+rhSpLdq05eeryNTVznxstuKqfd0Y/0pGoBcjTXHpIpyvsl3Jmx/57iv3mv/Fl9SRRzqxsdmJm+yUYSX80WaYHrrg/ZHCtmvd/qXLA+kGsv1tKnUW9xbhL80WnJWdmFr2Sn6ub9mpaN3wTvZ+JyQEM8SuXXBYrzbY98neAcnyDnZXw1oturS9yT1xX2JbuWzkdKyRlWliaenSldbJReqUHwktxnXY8q++jUoyYW9dk4AEBYAAAAAAAAAAAAAAAAAAAAAABBy1lOGGoyqz3aox3zk+rFf3xPUm3pHkmorbNfnXnFHCQtG0qs10IvZFe/Ls7N5yrFYidSbnUk5yk7ybd2/8A12H3j8bOtVlVqO8pu74LhFcEtiI5s0UKuP3MLJyHbL7AA+6NKU5KMYuUpOyildt8EicrHyeFyyTmDVmlKvU9Un7EbSqd76sfMsuFzMwcFrpOo+M5t37lZeRWnl1x47LdeFbLno5QenYHmzgv3Wj+Eg4zMjBzXRjOk+MJv5SujhZ0H7Mkfw+xdNHLAWvLGY9eknKk1XityVqi+77Xd4FVa8tq3oswsjNbiypZVKt6kjwl5MyjUw9RVKUtGS2r2ZLfGS3oiA7aTWmcJtPaOy5Ay1TxdLThqktVSG+EuHauDNmcYyFlaeFrKpDWtk4+/BvXHnvXadhwmIjUhGpB6UZxUovimY+TR6cuOmbmLkerHntGYHlz0rFoAAAAAAAAAAAAAAAAGLE1404OcnZRV39DxtLlhvR7OprUVrb3cEtsn425tHLc9ss/8RiHGLvTotxhwlL25+Ksuxdpbcr5RlRwNSvJ2q4i0KfGCldQS5RvLmzmBf8Ah8PJeo/yMvOuelBe/IADZpmYSsm4CpXqxpU1eUvCK3yk9yR1fN7IFLCQtFaU2unUa6Uuxe7Hs8SLmXkRYagpSX6WqlKfGK2xp9219vIsJk5OQ5vxXRtYmMoLyl3/AAAAVC6AAACu50ZrwxSc4WhWS1S2Kf2Z/Xau0sQOoTlB7RxOuM1qRwvEUJQlKE4uMotqSe1NbUYzovpDyIp0/wDiYLp00lVt7UL2Uucb+F+BX82c0qmJtOpenR47J1Pgvu+14XNiGRFw82Yk8Was8EQc3cg1MXUtHowj+sqW1R+yuMuzxOn0oQw1OFCjHXrVON777yqTfC7bfkYcRiaeGhGhQppy2Qpx3X3y/u7JWTcE4XnN6dWfXl8ox4JGRkZTul4x6X+/qaOPQq+F37slUKeirXu9snvb3syAEaLoAB6AAAAAAAAAAAAAVnOXFesqwoRerSjpfFJ2S7k795ZJySTb2JXfJFDwmI0sTCcvaqxb75op5k9JR+pXyJ6Sj9T30nVbLD0lqVpyty0Yx8m/EohfPShh3+gqbl6yD7G9GS+TKGfSYmvSWjJzN+swbfNPAKvjKUGrxTc5/DBXt3uy7zUFz9GNK9erL3aSS+9PX/SSXy8a2zjHj5WxTOigAwz6EAAAAHjdld6ktr3IA9B8Uqqkrxd1xWx8nvImUcq0qK6TvLdBdbv4HMpKK3I8ckltkyok09K1rO99lt976rGhx+W3KXqsMtKT1aS2L4V+ewgSr4jGy0Y9GmnrSb0F8T9p9hYsmZNhQjaKu31pPa/ouwrepO7iHC+v+CDylZ8vC+phyRkpUbyk9KpLrS22vtSv895swCzCCgtInjFRWkARsRiLSUI65y19kI75y/Jb2Z4Rsra/zfa+09T2xs+gAenoAAAAAAAAAAABEyq7UKtv8uf9LKAmdHrU1KLi9kk0+9WOdVqThJxkrOLafNGZnp7TKWWntMt1ehDH4Nxk7NrbtdOpHY7cL+TOW5UybVw9R06sdF67P2Zr3ovei2ZOx86MtKD29ZPZJcH9SzU8p4bEw0KsY69sKiTjfsezv1M0MD4morxkQzhC9Lb1JHIT7pVZRelGUotbGm013o6ZicxMJPXB1ad/cmpR/mT+ZAl6OobsVPvpx+ptLMqa7K7wrk+CvYPPDGU/2qqL/uRUvPU/M2tD0h1V18PSl8MpR+ekS16Oo/vMv4S/3GWHo9oLXPEVmuUIrxaZFKzFff8ABLGrLj0/3I69Iv8A4r/i/wDyfP8A1BqSejTwicnsWnKT8IxuT45CyZR61qjW6VSU/wCWNkZ1l+jSWjh6CivhUF4R1spW5eJDpfuS7tXz2Jf25MeEqZVr65KhhI8fV6VTui5PzsS508PQ1161TE1Fr/SS07P7NNdCHO1+002LyxWq6nNpP2Yqy5atb8TNk/N+rU1yXq49q6T5R+pnz+ITsfjTE6jNviO2/uZMdnDVqPRprQT1K2ub7L7u4zZMzdlJ6VZuK26N+m/ie758je5PyXSo9WPS3yeuT+ncTTmGM5PyteyaNDb3N7PijSjCKjGKilsS2H2DwudFno9NflLKWg1TgtOrLVGO5X9qXBELKGWnKXqsMtOb1aW5cuPPYj4qTpYCi6taWlUlff0py26Eb7uL7yJTlbLwr/Uhlbveul2za5Pwnq03J6U566kuL4LsW5EsgZDxM6uHp1KllKonOy2RUpNxj3RsTyXw8Pw/QkjrS0AAenQAAAAAAAAAAAAK9nTk+Li6yejJWUvt67LvLCaLO+dqMVxqK/dCTK+Sk6nsivS8HsqQJeSpQVWPrIpwl0ZX3X2S7LMslbNmi+q5w+9deZlV48rFuJQhS5raKnTrSj1ZSjyk18jOsp1l+2qfjZvXmot1Z/w0/wDUexzVjvrSfKCX5skWNeuv5O1Rav8ApoJ5RrPbVqfjZHnNva2+bv8AMt9LNqgtunL71vkifQyZRh1aUE+NrvxZIsK2XzM7WNY+2UnC4CrU6lOTXG1o+L1G4wma8nrqzUeyOt+L1LzLSCxDBrj3ySxxYrvkh4LJlKl1IJP3nrl4vZ5EwHhbjFRWkiwopcI9BHxeNp0lec1Hs3vkkV3KGcspXVGOiveeuT5LYvMjsvhX2zidsYdm/wAflCnRV5ys90Vrk+SK7VxdfGS0Ka0Ib+H35b+R7k7INSq9Os5RT16+vLnfqmHLmdtLDR9ThFCc1qclrpwfG/ty8u3ccV1XZT1rUSvZZtbnwv3ZPxuNw+TaWvp1ZrVG6059r92H962c9xOKrY7Ex03eVScYRS6sE3ayW5La+V2QcTiJ1JudSUpyk7uTd2y3+jfJWlUliJLo0040+2TXSa5L+o3K6IYte12UfUlfNQjxE6DRpqMVGOyMVFckrL5H2AZjNpAAAAAAAAAAAAAAAA02dVFyw917E1J8rNP5+RuT5qQUk01dNNNcUziyHnFx+pzOPlFo5uWPImX0kqdZ6lqjPbq4S+prMr5LlQlvcG+jL/S+DNeYkZzon9zMjKVUjpEJqSummnsad0z053h8VOm7wnKPJ2XhsNjSzixC9qMvih9LF+OfB/Mi3HLj7ougKh/iit7tL8Mv9x8Tzlrv/Ljyh9Wzv+uq+51/VQLkfFWrGKvKUYrtaXzKNWyxXltqyXK0fkREpTl7U5PnJ/Uilnr/AMxOHlr2RcMVnFQj1W6j+ytXizSYzOOtPVG1NdmuX4n9Bg83a09crU1265eCJ9eGCwSvWmnPalLpTfwwWz+9Z7GOVe9LhHLlbJbk9I1OCyTWrvS1pPbObflfXI21Z4TARUqslKp7Oq9R/BFdXn5lbyzn5VneOHj6qPvys6j5bo+fcVGrUlKTlKTlJ62222+bZq4vwiMfxT7Kssiuv5OX9SwZwZ3VsTeEb0aXup9KS+3L8tnMrgMuFw86k1CnFynJ2jFbWbUYRgtLhFKc5WS2+WZsl5PniKsaVNdKT27opbZvsR2PJuBhQpRpQVowVu1va5PtbuzW5rZvxwlPXaVWdvWT3fBH7K82bwysq/1HpdI2MTH9OO32wACqXAAAAAAAAAAAAAAAAAAD5nBSTTSaeppq6ZpcXm1SlrhJ03w2x89a8TeAjnVCfzI5lCMu0VGpmvWXVlTl3yT+Rh/w5iPdh+NFzPSu8Gr7kLxYFOhmzXe10lzm/wAkSqOaj9qqvuxb+f0LMVjL2acq13TxdeP2J1Jzp/O68ySvBo3+I4nRGK2o7/MyVcJgMP8Ara0L8J1Vf8EdZBxWfGFpLRw9KU+UVTp+L1vwKvjMz8ZT/Y+sXGnJSv3apeRqauBqx69GrH4qc180a9GDjx60ynPIsjwo+P5G5ynnli62pTVGPCnqffJ6/kV9u7betvW3vb7WfXq3wfgzPQybXn1KFaXw0pv8i/GMILjSKcpTm/xbZFBY8DmVi6nWhGkuM5K/4Y3ZaclZiUKdpVm68lufRp/hTu+99xHPJrj7kteJbP20UbIuQq+KlalHo3tKpK6px7977FrOnZv5v0sJHodKcl06jXSfYvdj2G0p01FKMUopKySSSS4JI+zOuyZWcdI1KMSFXPbAAKxaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuAAeHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
  }, {
    companyName: "DEF Enterprises",
    address: "789 Oak St, Village town",
    employeesCount: 200,
    reviewsCount: 30,
    totalReviewRating: 5,
    reviews: [
      {
        username: "anonymous1",
        reviewText: "Company is amazing",
        reviewScore: 4,
        reviewedDate: "",
      }
    ],
    openings: [],
    companyType: "Finance",
    followerCount: 300,
    about: "DEF Enterprises is a financial services firm providing investment solutions.",
    location: "Trivandrum",
    industry: "Information technology",
    logoUrl: "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707868800&semt=ais"
  }]

  getDetails(){
    return this.details;
  }
  onSelectedDetail(company:CompanyDetails){
    this.selectCompanyDetailObs$.next(company);
  }

  
}
