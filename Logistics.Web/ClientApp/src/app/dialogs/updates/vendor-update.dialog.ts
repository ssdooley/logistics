import { VendorService } from '../../services';
import { Vendor } from '../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vendor-update',
  templateUrl: 'vendor-update.dialog.html',
  providers: [VendorService]
})
export class VendorUpdateDialog implements OnInit {
  currentVendor = new Vendor();

  constructor(public dialogRef: MatDialogRef<VendorUpdateDialog>, @Inject(MAT_DIALOG_DATA) data: any, public service: VendorService)
  {
    this.currentVendor = data.vendor;    
  }

  ngOnInit() {
    console.log(this.currentVendor.name)
    this.service.getVendor(this.currentVendor.id)
  }

  async updateVendor(v: Vendor) {
    const res = await this.service.updateVendor(v);

    if (res) {
      this.service.getVendor(this.currentVendor.id);
    }
  }
  
}
