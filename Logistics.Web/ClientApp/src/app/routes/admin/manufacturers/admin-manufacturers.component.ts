import { Component, OnInit } from '@angular/core';
import { ManufacturerService, ItemCategoryService } from '../../../services';

import { MatDialog } from '@angular/material';
import { ItemCategory, Manufacturer, ItemGroupCategory } from '../../../models';
import { ConfirmDialog, ManufacturerBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-manufacturers',
  templateUrl: 'admin-manufacturers.component.html',
  providers: [ ManufacturerService, ItemCategoryService ]
})
export class AdminManufacturersComponent implements OnInit {
  selectedItemCategory = new ItemCategory();
  selectedItem = null;
  newManufacturer = new Manufacturer();
  selectedItemGroupCategory = new ItemGroupCategory();
  itemGroupCategories = new ItemGroupCategory();
  itemCategories: Array<ItemCategory>[];
  saving = false;

  constructor(
    public dialog: MatDialog,
    public service: ManufacturerService,
    public itemCategoryService: ItemCategoryService
  ) { }

  ngOnInit() {
    this.service.getManufacturers();
    this.service.getDeletedManufacturers();
    this.itemCategoryService.getItemGroupCategories();   
  }

  async addManufacturer() {
    this.saving = true;
    this.newManufacturer.itemCategoryId = this.selectedItemCategory.id;
    this.newManufacturer.itemCategory = this.selectedItemCategory;
    const res = await this.service.addManufacturer(this.newManufacturer);
    this.saving = false;

    if (res) {
      this.service.getManufacturers();
      this.newManufacturer = new Manufacturer();
    }
  }

  async updateManufacturer(m: Manufacturer) {
    const res = await this.service.updateManufacturer(m);
    if (res) {
      this.service.getManufacturers();
    }
  }

  toggleManufacturerDeleted(m: Manufacturer) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleManufacturerDeleted(m);
          if (res) {
            this.service.getManufacturers();
          }
        }
      })
  }

  showManufacturerBin() {
    this.dialog.open(ManufacturerBinDialog, {
      data: this.service, width: '420px'
    })
      .afterClosed()
      .subscribe(() => {
        this.service.getManufacturers();
      })
  }

  selectGroupCategory() {
    this.itemCategoryService.getItemCategories(this.selectedItemGroupCategory.id);
    console.log(this.selectedItemGroupCategory.label);
  }
  selectItemCategory() {
    this.selectedItem = this.selectedItemCategory;
    console.log(this.selectedItemCategory.label);
  }
}
