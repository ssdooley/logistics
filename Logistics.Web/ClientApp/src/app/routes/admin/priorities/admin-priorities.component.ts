import { Component, OnInit } from '@angular/core';
import { PriorityService } from '../../../services';
import { MatDialog } from '@angular/material';
import { Priority } from '../../../models';
import { ConfirmDialog, PriorityBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-priorities',
  templateUrl: 'admin-priorities.component.html',
  providers: [ PriorityService ]
})
export class AdminPrioritiesComponent implements OnInit {
  saving = false;
  newPriority = new Priority();

  constructor(
    public dialog: MatDialog,
    public service: PriorityService
  ) { }

  ngOnInit() {
    this.service.getPriorities();
  }

  async addPriority() {
    this.saving = true;
    const res = await this.service.addPriority(this.newPriority);
    this.saving = false;

    if (res) {
      this.service.getPriorities();
      this.newPriority = new Priority();
    }
  }

  async updatePriorities(p: Priority) {
    const res = await this.service.updatePriority(p);

    if (res) {
      this.service.getPriorities();
    }
  }

  togglePriorityDeleted(p: Priority) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.togglePriorityDeleted(p);
          if (res) {
            this.service.getPriorities();
          }
        }
      })
  }

  showPriorityBin() {
    this.dialog.open(PriorityBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => { this.service.getPriorities() })
  }
}
