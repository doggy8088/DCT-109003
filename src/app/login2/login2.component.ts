import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

function 身分證字號Validator(control: AbstractControl): ValidationErrors {
  if (checkTwID(control.value)) {
    return null;
  } else {
    return {
      身分證字號: false
    };
  }
}

// tslint:disable-next-line: max-line-length
const 身分證字號ValidatorAsync: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  return new Promise<ValidationErrors | null>((resolve, reject) => {
    setTimeout(() => {
      if (checkTwID(control.value)) {
        resolve(null);
      } else {
        resolve({
          身分證字號: false
        });
      }
    }, 3000);
  });
};

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
      email:
        this.fb.control('doggy.huang@gmail.com', [Validators.required], [身分證字號ValidatorAsync]),
      // ['doggy.huang@gmail.com', [Validators.required, 身分證字號Validator]],
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

  doSubmit(form: FormGroupDirective) {
    if (form.valid) {
      // TODO: HTTP POST
    }
  }

}


function checkTwID(id: string) {
  // 建立字母分數陣列(A~Z)
  const city = new Array(
    1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
    20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30
  );
  id = id.toUpperCase();
  // 使用「正規表達式」檢驗格式
  if (id.search(/^[A-Z](1|2)\d{8}$/i) === -1) {
    return false;
  } else {
    // 將字串分割為陣列(IE必需這麼做才不會出錯)
    const arrId = id.split('');
    // 計算總分
    let total = city[arrId[0].charCodeAt(0) - 65];
    for (let i = 1; i <= 8; i++) {
      // tslint:disable-next-line: no-eval
      total += eval(arrId[i]) * (9 - i);
    }
    // 補上檢查碼(最後一碼)
    // tslint:disable-next-line: no-eval
    total += eval(arrId[9]);
    // 檢查比對碼(餘數應為0);
    return ((total % 10 === 0));
  }
}
