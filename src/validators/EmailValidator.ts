import { FormControl } from "@angular/forms";

export class EmailValidator {

  public static isValid(emailCtrl: FormControl)  {
    let isValid = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.[a-zA-Z0–9]+$/.test(emailCtrl.value);
    return isValid;
  }
}
