import { PurchaseRequestService, SnackerService, FormService, CustomValidators} from '../../services';
import { RequestItem, Request } from '../../models';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, NgForm } from '@angular/forms';



@Component({
  selector: 'edit-items.dialog',
  templateUrl: 'edit-items.dialog.html',
  providers: [PurchaseRequestService]
})
export class EditItemsDialog implements OnInit {
  newItem = new RequestItem();
  itemForm: FormGroup;

  
  costPattern = "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$";
  numPattern = "^[1-9]+$";

  constructor(public dialog: MatDialogRef<EditItemsDialog>, @Inject(MAT_DIALOG_DATA) public data: RequestItem,
    public service: PurchaseRequestService, public snacker: SnackerService) { }

  ngOnInit() {   
    this.newItem = this.data;
  }

  existRequestItems(): void {
    
      this.dialog.close();
  }

  onSubmit(f: NgForm) {
    //console.log(f.value);
    //console.log(f.valid);

  }

  addRequestItem() {
      this.dialog.close(this.newItem);
  }
}
