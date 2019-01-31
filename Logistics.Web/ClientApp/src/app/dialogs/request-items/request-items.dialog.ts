import { PurchaseRequestService } from '../../services';
import { RequestItem, Request } from '../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'request-items.dialog',
  templateUrl: 'request-items.dialog.html',
  providers: [PurchaseRequestService]
})
export class RequestItemsDialog implements OnInit {
  newItem = new RequestItem();

  constructor(public dialog: MatDialogRef<RequestItemsDialog>, @Inject(MAT_DIALOG_DATA) public data: Request,
    public service: PurchaseRequestService) { }

  ngOnInit() {
    //this.service.getRequestItems(this.data.id);
  }

  existRequestItems(): void {
    this.dialog.close();
  }

  addRequestItem(item: RequestItem) {
    this.dialog.close(item);
  }
}
