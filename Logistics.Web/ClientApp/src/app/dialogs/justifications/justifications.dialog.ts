import { AuthorizedRegulationService, PurchaseRequestService } from '../../services';
import { AuthorizedRegulation, Request } from '../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'justification',
  templateUrl: 'justifications.dialog.html',
  providers: [AuthorizedRegulationService]
})
export class JustificationDialog implements OnInit {
  selectedJustification = new AuthorizedRegulation();
  justification: Array<AuthorizedRegulation> = [];
  regString: string;
  test: string;
  newReg = new AuthorizedRegulation();

  constructor(public dialog: MatDialogRef<JustificationDialog>, @Inject(MAT_DIALOG_DATA) public data: Request,
    public service: AuthorizedRegulationService, public requestService: PurchaseRequestService) { }

  ngOnInit() {
    this.service.getAuthorizedRegulations();
  }

  exitJustification(): void {
    this.dialog.close();
  }
  addJustification(reg: AuthorizedRegulation)   {
    this.test = this.newReg.name + " : " + this.newReg.reference;
    this.newReg.name = reg.name;    
    this.newReg.reference = reg.reference;
    this.regString = this.justification.toString();
    this.dialog.close(this.newReg.name.toString() + " : " + this.newReg.reference.toString());
  }
}
