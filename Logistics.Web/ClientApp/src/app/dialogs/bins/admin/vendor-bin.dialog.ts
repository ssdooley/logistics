import { VendorService } from '../../../services';
import { Vendor } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vendor-bin',
  templateUrl: 'vendor-bin.dialog.html'
})
export class VendorBinDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendorBinDialog>, @Inject(MAT_DIALOG_DATA) public service: VendorService) { }

  ngOnInit() {
    this.service.getDeletedVendors();
  }

  async toggleVendorDeleted(p: Vendor) {
    const res = await this.service.toggleVendorDeleted(p);
    if (res) {
      this.service.getDeletedVendors();
    }
  }

}
