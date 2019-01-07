import { PriorityService } from '../../../services';
import { Priority } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'priority-bin',
  templateUrl: 'priority-bin.dialog.html'
})
export class PriorityBinDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<PriorityBinDialog>, @Inject(MAT_DIALOG_DATA) public service: PriorityService) { }

  ngOnInit() {
    this.service.getDeletedPriorities();
  }

  async togglePriorityDeleted(p: Priority) {
    const res = await this.service.togglePriorityDeleted(p);
    if (res) {
      this.service.getDeletedPriorities();
    }
  }

}
