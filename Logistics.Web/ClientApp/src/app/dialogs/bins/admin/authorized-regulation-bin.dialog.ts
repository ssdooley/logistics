import { AuthorizedRegulationService } from '../../../services';
import { AuthorizedRegulation } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'authorized-regulation',
  templateUrl: 'authorized-regulation-bin.dialog.html'
})
export class AuthorizedRegulationBinDialog implements OnInit {

  constructor(public dialoRef: MatDialogRef<AuthorizedRegulationBinDialog>, @Inject(MAT_DIALOG_DATA) public service: AuthorizedRegulationService) { }

  ngOnInit() {
    this.service.getDeletedAuthorizedRegulations();
  }

  async toggleAuthorizedRegulationDeleted(r: AuthorizedRegulation) {
    const res = await this.service.toggleAuthorizedRegulationDeleted(r);
    if (res) {
      this.service.getDeletedAuthorizedRegulations();
    }
  }
}
