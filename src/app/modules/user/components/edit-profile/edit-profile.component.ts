import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserProfileService } from '../../service/user-profile.service';
import { UserFireResponse } from 'src/app/modules/auth/Models/userFireResponse.model';
import { EducationType } from '../../models/my-jobs';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { UserProfileModel } from 'src/app/shared/Models/user-profile.types';
import { ResponseUserModel } from 'src/app/shared/Models/auth.types';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [DatePipe]
})
export class EditProfileComponent {

  @ViewChild('stepper') stepper!: MatStepper;
  focusSection: string = ''
  currentProfileId: string = ''
  updateMode: boolean = true;
  isLoading: boolean = true;
  // Model Form Groups
  userDetail !: FormGroup;
  // All the FormArrays
  educationArray!: FormArray;
  certificationArray!: FormArray;
  skillsArray!: FormArray;
  experienceArray!: FormArray;
  knownLanguageArray!: FormArray;
  preferredLocationArray!: FormArray;

  private currentUser: ResponseUserModel = this.authService.userSubFA$.getValue();


  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private handleMsgService: HandleMessageService,
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private datePipe: DatePipe) {

  }

  ngOnInit() {

    // User Detail Form
    this.userDetail = this.fb.group({
      personalDetail: this.fb.group({
        name: ['', Validators.required],
        heading: ['',],
        email: { value: this.currentUser.email, disabled: true },
        phoneNumber: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        socialMediaLink: ['', Validators.required],

        githubLink: [''],
        country: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
        postalCode: ['']
      }),
      education: this.fb.array([
        this.fb.group({
          level: ['', Validators.required],
          fieldOfStudy: [''],
          startedDate: ['', Validators.required],
          endedDate: ['', Validators.required]
        })
      ]),
      certifications: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          certificateId: [''],
          mode: ['', Validators.required],
          institution: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
        })
      ]),
      skills: this.fb.array([
        new FormControl('', Validators.required)
      ]),
      experience: this.fb.array([
        this.fb.group({
          position: ['', Validators.required],
          companyName: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required]
        })
      ]),
      knownLanguages: this.fb.array([
        this.fb.group({
          language: ['', Validators.required],
          level: ['', Validators.required],
          reading: [false, Validators.required],
          writing: [false, Validators.required],
          speaking: [false, Validators.required]
        })
      ]),
      preferredLocations: this.fb.array([
        new FormControl('', Validators.required)
      ]),
      otherPreference: this.fb.group({
        jobType: ['', Validators.required]
      })
    });


    // get a value of all form Arrays
    this.educationArray = this.userDetail.get('education') as FormArray;
    this.certificationArray = this.userDetail.get('certifications') as FormArray;
    this.skillsArray = this.userDetail.get('skills') as FormArray;
    this.experienceArray = this.userDetail.get('experience') as FormArray;
    this.knownLanguageArray = this.userDetail.get('knownLanguages') as FormArray;
    this.preferredLocationArray = this.userDetail.get('preferredLocations') as FormArray;


    // get section-id
    this.focusSection = this.activeRoute.snapshot.queryParamMap.get('section') ?? '';
    setTimeout(() => {
      this.focusSection && this.onGoToSection(this.focusSection);
    }, 50)

    // update the form is edit Mode or Update Mode
    this.userProfileService.getProfileByUserId(this.authService.currentUserIdSub.getValue()).subscribe({
      next: res => {
        if (res) {
          console.log("successful man🤡🤡");

          this.updateMode = true;
          this.currentProfileId = res.profileId
          this.updateUserDetailForm(res);
          this.isLoading = false;
        }
      },
      error: _err => {
        console.log("user not found");

        this.isLoading = false;
        this.updateMode = false;
      }
    })



  }






  private updateUserDetailForm(user: UserProfileModel) {
    this.userDetail.get('personalDetail')?.patchValue(user.personalDetail);
    this.userDetail.get('otherPreference')?.patchValue(user.otherPreference);

    this.updateUserDetailArrays(user.education, this.educationArray);
    this.updateUserDetailArrays(user.certifications, this.certificationArray);
    this.updateUserDetailArrays(user.experience, this.experienceArray);
    this.updateUserDetailArrays(user.knownLanguages, this.knownLanguageArray);

    this.updateUserDetailControls(user.skills, this.skillsArray);
    this.updateUserDetailControls(user.preferredLocations, this.preferredLocationArray);
  }

  private updateUserDetailArrays(arr: Object[], formArray: FormArray) {
    console.log("arr", arr);

    arr.forEach((educationItem, index) => {
      if (index < formArray.length) {
        console.log("items", educationItem);

        formArray.at(index).patchValue(educationItem);
      } else {
        console.log("Education Item", educationItem);
        let temp = this.createNewFormGroup(educationItem)
        temp.patchValue(educationItem)
        formArray.push(temp);

        // this.addEducation(this.getUserData(educationItem))
      }
    });
  }
  getUserData(obj: any): EducationType {
    return obj as EducationType; // Type assertion
  }



  private updateUserDetailControls(controls: string[], formArray: FormArray) {
    if (controls) {
      formArray.clear();
      controls.forEach(control => {
        formArray.push(new FormControl(control, Validators.required));
      });
    }
  }

  onGoToSection(section: string) {
    if (!section.length)
      return;
    const element = document.getElementById(section + '-section');
    console.log("element", element);
    if (section == 'education' || section == 'certification') {
      this.goToNextStep();
    }
    else if (section == 'skills' || section == 'experience' || section == 'language') {
      this.goToNextStep();
      this.goToNextStep();
    }
    else if (section == 'location') {
      this.goToNextStep();
      this.goToNextStep();
      this.goToNextStep();

    }
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }, 0)
    }
  }

  goToNextStep() {
    this.stepper.next();
  }
  onClickCreateUserProfile() {
    // debugger

    if (this.userDetail.valid && this.authService.loggedInSub$.getValue()) {
      this.formatDatesInFormGroup(this.userDetail)
      const user = this.currentUser;
      const userProfile: UserProfileModel = {
        ...this.userDetail.value,
        profileId: this.authService.currentUserIdSub.getValue()

      };
      userProfile.personalDetail.email = this.currentUser.email;

      console.log(userProfile);
      
      if (this.updateMode) {
        this.userProfileService.updateProfile(userProfile);
      }
      else {

        this.userProfileService.createUserProfile(userProfile);
      }

    }
    else {
      console.log("Form is not valid🤡🤡", this.userDetail.value);

    }
  }

  formatDatesInFormGroup(formGroup: FormGroup | FormArray): void {
    for (const controlName in formGroup.controls) {
      const control = formGroup.get(controlName);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.formatDatesInFormGroup(control);
      } else if (controlName === 'dob' || controlName === 'startDate' ||
        controlName === 'endDate' || controlName === 'startedDate' || controlName === 'endedDate') {
        // Date controls found, format the date
        const dateValue = control?.value;
        if (dateValue instanceof Date) {
          const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-dd');
          control?.patchValue(formattedDate);
        }
      }
    }
  }

  // Add FormArrays
  createNewFormGroup(formModel: any): FormGroup {
    const formGroup = this.fb.group(formModel);
    formGroup.reset();
    return formGroup;
  }

  addEducation() {
    const newEducationGroup = this.createNewFormGroup({
      level: ['', Validators.required],
      fieldOfStudy: [''],
      startedDate: ['', Validators.required],
      endedDate: ['', Validators.required]
    });
    this.educationArray.push(newEducationGroup);
  }

  addCertifications() {
    const newCertificationGroup = this.createNewFormGroup({
      title: ['', Validators.required],
      certificateId: [''],
      mode: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.certificationArray.push(newCertificationGroup);
  }


  addSkills() {
    this.skillsArray.push(
      new FormControl('', Validators.required)
    )
  }

  addPreferredLocations() {
    if (this.preferredLocationArray.length < 5) {
      this.preferredLocationArray.push(
        new FormControl('', Validators.required)
      )
    } else {
      this.handleMsgService.warningMessage("Upto 5 Preferred Locations are available",
        "Maximum Locations")
    }

  }

  addExperience() {
    const newExperienceGroup = this.createNewFormGroup({
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.experienceArray.push(newExperienceGroup);
  }


  addLanguage() {
    const newLanguageGroup = this.createNewFormGroup({
      language: ['', Validators.required],
      level: ['', Validators.required],
      reading: [false],
      writing: [false],
      speaking: [false]
    });
    this.knownLanguageArray.push(newLanguageGroup);
  }


  deleteFormArrayElements(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }



}


