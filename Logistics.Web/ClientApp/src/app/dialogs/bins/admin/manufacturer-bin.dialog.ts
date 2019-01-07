import { ManufacturerService } from '../../../services';
import { Manufacturer } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'manufacturer-bin',
  templateUrl: 'manufacturer-bin.dialog.html'
})
export class ManufacturerBinDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManufacturerBinDialog>, @Inject(MAT_DIALOG_DATA) public service: ManufacturerService) { }

  ngOnInit() {
    this.service.getDeletedManufacturers();
  }

  async toggleManufacturerDeleted(m: Manufacturer) {
    const res = await this.service.toggleManufacturerDeleted(m);
    if (res) {
      this.service.getDeletedManufacturers();
    }
  }
}
