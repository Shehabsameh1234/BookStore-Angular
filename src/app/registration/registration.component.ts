import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RegistrationService } from '../shared/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  isShowPassword: boolean = false
  isShowRePassword: boolean = false
  isMatch: boolean = true
  isLoading:boolean = false
  errorMessege!:string
  constructor(private titleService: Title, private _RegistrationService: RegistrationService,private _router:Router) {
    titleService.setTitle("signup")
  }

  registerForm: FormGroup = new FormGroup({
    displayName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z0-9]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z0-9]).{8,}$/)]),
    PhoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })
  validPassword(registerForm: any) {
    if (registerForm.get('password').value != registerForm.get('rePassword').value) this.isMatch = false
    else this.isMatch = true
  }
  signUpSubimt(registerForm: FormGroup) {
    this.isLoading=true
    this._RegistrationService.signUp(registerForm.value).subscribe({
      next: (res) => {
        this.isLoading=false
        this.errorMessege=''
        this._router.navigate(['/registration/login']);
      },
      error: (error) => {
        this.isLoading=false
        this.errorMessege=error.error.messege;
      },
    })
  }

  showPassword() {
    if (this.isShowPassword == false) {
      this.isShowPassword = true
    }
    else {
      this.isShowPassword = false
    }
  }
  showRePassword() {
    if (this.isShowRePassword == false) {
      this.isShowRePassword = true
    }
    else {
      this.isShowRePassword = false
    }
  }
  labelval: string = ""
  label1(event: any) {
    this.labelval = event.target.value
  }
  labelval1: string = ""
  label2(event: any) {
    this.labelval1 = event.target.value
  }
  labelval2: string = ""
  label3(event: any) {
    this.labelval2 = event.target.value
  }
  labelval3: string = ""
  label4(event: any) {
    this.labelval3 = event.target.value
  }
  labelval4: string = ""
  label5(event: any) {
    this.labelval4 = event.target.value
  }

}
