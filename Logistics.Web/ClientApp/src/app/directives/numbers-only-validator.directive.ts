
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import {
  NgControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  FormControl,
  FormGroup
} from '@angular/forms';



@Directive({
  selector: '[numbersOnly][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumbersOnlyDirective,
    multi: true
  }]
})

export class NumbersOnlyDirective implements Validator {
  // @Input('numbersOnly') onlyNumbers: string = /[^1-9]+/;
  validator: ValidatorFn;
  validRegEx = /[^1-9]+/;

  constructor(private _el: ElementRef) {
    this.validator = this.numbersOnly();
  }

  //@HostListener('input', ['$event']) onInputChange(event) {
  //  const initialValue = this._el.nativeElement.value;
  //  this._el.nativeElement.value = initialValue.replace(/[^1-9]+/, '');
  //  if (initialValue !== this._el.nativeElement.value) {
  //    event.stopPropagation();
  //  }
  //}

  validate(c: FormControl) {
    return this.validator(c);
  }

  numbersOnly(): ValidatorFn {
    return (c: FormControl) => {
      let isValid = this.validRegEx.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          numbersonly: {
            valid: false
          }
        };
      }
    }
  }
 

}
