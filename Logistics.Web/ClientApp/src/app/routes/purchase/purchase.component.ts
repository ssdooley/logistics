import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from '../../services';

import { MatDialog } from '@angular/material';
import { Request, RequestItem, RequestAttachment, AuthorizedRegulation, Site, Priority } from '../../models';
import { ConfirmDialog } from '../../dialogs'

@Component({
  selector: 'purchase',
  templateUrl: 'purchase.component.html',
  providers: [PurchaseRequestService]
})
export class PurchaseComponent {
  selectedPriority = new Priority();
  selectedSite = new Site();
  selectedMission = ['Red', 'Blue'];
  selectedRequester: string;
  selectedAuthorizations: Array <AuthorizedRegulation>[];
  selectedItems: Array <RequestItem>[];

  constructor(public dialog: MatDialog, public service: PurchaseRequestService) { }

  ngOnInit() {
    this.service.getPurchaseRequests();
    this.service.getRequestItems();
  }
}
