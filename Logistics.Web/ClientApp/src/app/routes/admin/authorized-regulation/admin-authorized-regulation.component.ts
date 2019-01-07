import { Component, OnInit } from '@angular/core';
import { AuthorizedRegulationService } from '../../../services';
import { MatDialog } from '@angular/material';
import { AuthorizedRegulation } from '../../../models';
import { ConfirmDialog, AuthorizedRegulationBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-authorized-regulation',
  templateUrl: 'admin-authorized-regulation.component.html',
  providers: [AuthorizedRegulationService]
})
export class AdminAuthorizedRegulationComponent implements OnInit {
  saving = false;
  newAuthorizedRegulation = new AuthorizedRegulation();

  constructor(public dialog: MatDialog, public service: AuthorizedRegulationService) { }

  ngOnInit() {
    this.service.getAuthorizedRegulations();
    console.log("from admin authorized regulation oninit")
  }

  async addAuthorizedRegulation() {
    this.saving = true;
    const res = await this.service.addAuthorizedRegulations(this.newAuthorizedRegulation);
    this.saving = false;

    if (res) {
      this.service.getAuthorizedRegulations();
      this.newAuthorizedRegulation = new AuthorizedRegulation();
    }
  }

  async updateAuthorizedRegulations(r: AuthorizedRegulation) {
    const res = await this.service.updateAuthorizedRegulation(r);
    if (res) {
      this.service.getAuthorizedRegulations();
    }
  }

  toggleAuthorizedRegulationDeleted(r: AuthorizedRegulation) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleAuthorizedRegulationDeleted(r);
          if (res) {
            this.service.getAuthorizedRegulations();
          }
        }
      })
  }

  showAuthorizedRegulationBin() {
    this.dialog.open(AuthorizedRegulationBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => { this.service.getAuthorizedRegulations() })
  }

}
