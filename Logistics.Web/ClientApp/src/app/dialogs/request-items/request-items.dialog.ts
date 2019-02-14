import { PurchaseRequestService, SnackerService, FormService, CustomValidators} from '../../services';
import { RequestItem, Request } from '../../models';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { validateBasis } from '@angular/flex-layout';
import { AllValidationErrors, getFormValidationErrors } from '../../interfaces';

@Component({
  selector: 'request-items.dialog',
  templateUrl: 'request-items.dialog.html',
  providers: [PurchaseRequestService]
})
export class RequestItemsDialog implements OnInit {
  newItem = new RequestItem();
  itemsForm: FormGroup;
  formErrors = {
    partNumber: '',
    name: '',
    qnty: '',
    cost: '',
  };
  costPattern = "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$";

  constructor(public dialog: MatDialogRef<RequestItemsDialog>, @Inject(MAT_DIALOG_DATA) public data: Request,
    public service: PurchaseRequestService, public snacker: SnackerService, public formService: FormService, public form: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

    //this.service.getRequestItems(this.data.id);
  }
  
  existRequestItems(): void {
    this.dialog.close();
  }

  signUp(data) {
    // mark all fields as touched
    this.formService.markFormGroupTouched(this.itemsForm);

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched
    if (this.itemsForm.valid) {      
      this.newItem.partNumber = data.partNumber;
      this.snacker.sendSuccessMessage('Succesfully submitted a valid form PartNumber: ' + this.newItem.partNumber);

      this.itemsForm.reset();
    } else {
      this.formErrors = this.formService.validateForm(this.itemsForm, this.formErrors, false)
      this.snacker.sendErrorMessage('The form is not Valid');
    }    
  }
  // build the user edit form
  buildForm() {
    this.itemsForm = this.form.group({
      partNumber: ['', Validators.required],
      name: ['', Validators.required],
      qnty: ['', [Validators.required, CustomValidators.validateCharacters]],
      cost: ['', [Validators.required, Validators.pattern(this.costPattern)]]
    });

  // on each value change we call the validateForm function
  // We only validate form controls that are dirty, meaning they are touched
  // the result is passed to the formErrors object
    this.itemsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.itemsForm, this.formErrors, true)
    });
  }

  addRequestItem(data) {

    if (this.itemsForm.invalid) {
      this.formErrors = this.formService.validateForm(this.itemsForm, this.formErrors, false)
      this.snacker.sendErrorMessage("Form is Invalid");
      return;
      }

    if (!this.itemsForm.invalid) {
      this.newItem.partNumber = data.partNumber;
      this.newItem.name = data.name;
      this.newItem.quantity = data.qnty;
      this.newItem.cost = data.cost;
        this.dialog.close(this.newItem);
      }
    }
}
