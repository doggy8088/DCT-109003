import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ssid][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: SsidValidator, multi: true }
  ]
})

export class SsidValidator implements Validator {
  validate(c: FormControl): { [key: string]: any } {
    if (checkTwID(c.value)) {
      return null;
    } else {
      return {
        身分證字號: false
      };
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
