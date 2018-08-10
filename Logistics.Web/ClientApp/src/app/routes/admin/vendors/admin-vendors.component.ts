import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../services/vendor.service';

@Component({
  selector: 'admin-vendors',
  templateUrl: 'admin-vendors.component.html',
  providers: [ VendorService ]
})
export class AdminVendorsComponent implements OnInit {
  constructor(
    public service: VendorService
  ) { }

  ngOnInit() {
    this.service.getVendors();
  }
}
