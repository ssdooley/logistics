import { SiteService } from '../../../services';
import { Site } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'site-bin',
  templateUrl: 'site-bin.dialog.html'
})
export class SiteBinDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<SiteBinDialog>, @Inject(MAT_DIALOG_DATA) public service: SiteService) { }

  ngOnInit() {
    this.service.getDeletedSites();
  }

  async toggleSiteDeleted(s: Site) {
    const res = await this.service.toggleSiteDeleted(s);
    if (res) {
      this.service.getDeletedSites();
    }
  }

}
