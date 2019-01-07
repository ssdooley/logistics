import { ItemCategoryService } from '../../../services';
import { ItemCategory, ItemGroupCategory } from '../../../models';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'item-category-bin',
  templateUrl: 'item-category-bin.dialog.html',
  providers: [ItemCategoryService]
})
export class ItemCategoryBinDialog implements OnInit {
  group = new ItemGroupCategory;

  constructor(public dialogRef: MatDialogRef<ItemCategoryBinDialog>, @Inject(MAT_DIALOG_DATA) data: any, public service: ItemCategoryService)
  {
    this.group = data.categoryGroup;    
  }


  ngOnInit() {    
    this.service.getDeletedItemCategories(this.group.id);
  }

  async toggleItemCategoryDeleted(i: ItemCategory) {
    const res = await this.service.toggleItemCategoryDeleted(i);
    if (res) {
      this.service.getDeletedItemCategories(this.group.id);
    }
  }

}
