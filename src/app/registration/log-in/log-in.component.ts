import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/shared/services/registration.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  isShowPassword: boolean = false
  isLoading: boolean = false
  errorMessege!: string

  constructor(private titleService: Title, private _RegistrationService: RegistrationService, private _router: Router) {
    titleService.setTitle("login")
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z0-9]).{8,}$/)]),
  })

  logInsubmit(loginForm: FormGroup) {
    this.isLoading = true
    this._RegistrationService.logIn(loginForm.value).subscribe({
      next: (res) => {
        console.log(res);4 
        localStorage.setItem("userToken", res.token)
        this._RegistrationService.isLogin.next(true)
        this.errorMessege = ''
        this._router.navigate(["/home"])
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessege = error.error.messege
      }
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
  labelval2: string = ""
  label3(event: any) {
    this.labelval2 = event.target.value
  }
  labelval3: string = ""
  label4(event: any) {
    this.labelval3 = event.target.value
  }



}
