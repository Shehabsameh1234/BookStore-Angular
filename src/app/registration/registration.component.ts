import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("contact")
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

}
