import { IdentityService } from '../../../services';
import { User } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'user-bin',
  templateUrl: 'user-bin.dialog.html'
})
export class UserBinDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserBinDialog>, @Inject(MAT_DIALOG_DATA) public service: IdentityService) { }

  ngOnInit() {
    this.service.getDeletedUsers();
  }

  async toggleUserDeleted(u: User) {
    const res = await this.service.toggleUserIsDeleted(u);
    if (res) {
      this.service.getDeletedUsers();
    }
  }
}
