import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services';
import { MatDialog } from '@angular/material';
import { Site } from '../../../models';
import { ConfirmDialog, SiteBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-sites',
  templateUrl: 'admin-sites.component.html',
  providers: [ SiteService ]
})
export class AdminSitesComponent implements OnInit {
  newSite = new Site();
  saving = false;

  constructor(
    public dialog: MatDialog,
    public service: SiteService
  ) { }

  ngOnInit() {
    this.service.getSites();    
  }

  async addSite() {
    this.saving = true;
    const res = await this.service.addSite(this.newSite);
    this.saving = false;

    if (res) {
      this.service.getSites();
      this.newSite = new Site();
    }
  }

  async updateSite(s: Site) {
    const res = await this.service.updateSite(s);

    if (res) {
      this.service.getSites();
    }
  }

  toggleSiteDeleted(s: Site) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleSiteDeleted(s);
          if (res) {
            this.service.getSites();
          }
        }
      }) 
  }

  showSiteBin() {
    this.dialog.open(SiteBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => { this.service.getSites() } )
  }
}
