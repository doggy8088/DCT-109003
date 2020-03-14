import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  data: any = {
    email: 'doggy.huang@gmail.com',
    password: '123123123',
    phone: '0988888888',
    isRemember: true
  };

  origBodyClass = '';

  constructor() { }

  ngOnInit(): void {
    this.origBodyClass = document.body.className;
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.origBodyClass;
  }

  doSubmit(form: NgForm) {
    if (form.valid) {
      // TODO: HTTP POST
    }
  }

  isFieldValid(control: NgModel) {
    return control.formDirective.submitted && control.invalid;
  }

}
