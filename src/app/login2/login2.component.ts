import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  origBodyClass = '';

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.origBodyClass = document.body.className;
    document.body.className = 'bg-gradient-primary';

    // this.form = this.fb.group({
    //   email: 'doggy.huang@gmail.com',
    //   password: '123123123'
    // });

    this.form = this.fb.group({
      email: ['doggy.huang@gmail.com', [Validators.required, Validators.email]],
      password: ['123123123', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      isRemember: [true],
    });

    // this.form = this.fb.group({
    //   email: this.fb.control('doggy.huang@gmail.com'),
    //   password: this.fb.control('123123123')
    // });

  }

  ngOnDestroy(): void {
    document.body.className = this.origBodyClass;
  }

  doSubmit(form: NgForm) {
    if (form.valid) {
      // TODO: HTTP POST
    }
  }

}
