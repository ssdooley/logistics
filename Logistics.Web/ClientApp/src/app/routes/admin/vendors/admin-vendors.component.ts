import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../services';
import { MatDialog } from '@angular/material';
import { Vendor } from '../../../models';
import { ConfirmDialog, VendorBinDialog, VendorUpdateDialog } from '../../../dialogs';

@Component({
  selector: 'admin-vendors',
  templateUrl: 'admin-vendors.component.html',
  providers: [ VendorService ]
})
export class AdminVendorsComponent implements OnInit {
  saving = false;
  newVendor = new Vendor();
  selectedVendor = new Vendor();

  constructor ( public dialog: MatDialog, public service: VendorService ) { }

  ngOnInit() {
    this.service.getVendors();
  }

  async addVendor() {
    this.saving = true;
    const res = await this.service.addVendor(this.newVendor);
    this.saving = false;

    if (res) {
      this.service.getVendors();
      this.newVendor = new Vendor();
    }
  }

  updateVendor(v: Vendor) {
    this.selectedVendor = v;
    this.dialog.open(VendorUpdateDialog, {
      data: { 'vendor' : this.selectedVendor }, width: '550px'} )
      .afterClosed()
      .subscribe(() => { this.service.getVendors() } )
  }

  toggleVendorDeleted(v: Vendor) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleVendorDeleted(v);
          if (res) {
            this.service.getVendors();
          }
        }
      })
  }

  showVendorBin() {
    this.dialog.open(VendorBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => { this.service.getVendors() })
  }
}
