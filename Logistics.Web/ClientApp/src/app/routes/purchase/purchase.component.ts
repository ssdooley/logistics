import { Component } from '@angular/core';
import { PurchaseRequestService } from '../../services';

import { MatDialog } from '@angular/material';
import { Request, RequestItem, RequestAttachment, AuthorizedRegulation, Site, Priority } from '../../models';
import { ConfirmDialog } from '../../dialogs'

@Component({
  selector: 'purchase',
  templateUrl: 'purchase.component.html',
})
export class PurchaseComponent {
 
}
