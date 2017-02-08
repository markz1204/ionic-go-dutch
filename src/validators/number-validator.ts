import { FormControl } from "@angular/forms";

export class NumberValidator {

  public static isNumber(control: FormControl)  {
    let valid = /^\d+/.test(control.value);
    if (!valid) {
      return {isNotNumber: true}
    }else{
      return null;
    }
  }

  public static exceedsLimit(control: FormControl) {
    if(control.value > 100){
      return {exceedLimit: true}
    }

    return null;
  }
}
