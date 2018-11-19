import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services';

@Component({
  selector: 'admin-sites',
  templateUrl: 'admin-sites.component.html',
  providers: [ SiteService ]
})
export class AdminSitesComponent implements OnInit {
  constructor(
    public service: SiteService
  ) { }

  ngOnInit() {
    this.service.getSites();
  }
}
