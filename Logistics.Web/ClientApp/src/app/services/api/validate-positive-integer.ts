import { FormControl } from '@angular/forms';

export function validatePositiveInt(c: FormControl) {
  let positiveInt_RegExp = /^[1-9]\d*$/

  return positiveInt_RegExp.test(c.value) ? null : {
    validatePositiveInt: {
      valid: false
    }
  };
}


