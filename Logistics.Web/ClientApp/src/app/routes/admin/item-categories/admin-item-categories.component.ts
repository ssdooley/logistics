import { Component, OnInit } from '@angular/core';
import { ItemCategoryService } from '../../../services';
import { MatDialog } from '@angular/material';
import { ItemCategory, ItemGroupCategory } from '../../../models';
import { ConfirmDialog, ItemCategoryBinDialog } from '../../../dialogs';

@Component({
  selector: 'admin-item-categories',
  templateUrl: 'admin-item-categories.component.html',
  providers: [ ItemCategoryService ]
})
export class AdminItemCategoriesComponent implements OnInit {
  selectedItemGroupCategory = new ItemGroupCategory();
  newItemCategory = new ItemCategory();
  saving = false;

  constructor(
    public dialog: MatDialog,
    public service: ItemCategoryService
  ) { }

  ngOnInit() {
    this.service.getItemGroupCategories();
  }

  async addItemCategory() {
    this.saving = true;
    this.newItemCategory.itemGroupCategoryId = this.selectedItemGroupCategory.id;
    const res = await this.service.addItemCategory(this.newItemCategory);
    this.saving = false;

    if (res) {
      this.service.getItemGroupCategories();
      this.newItemCategory = new ItemCategory();
    }
  }

  async updateItemCategories(i: ItemCategory) {
    const res = await this.service.updateItemCategory(i);

    if (res) {
      this.service.getItemGroupCategories();
    }
  }

  toggleItemCategoryDeleted(i: ItemCategory) {
    this.dialog.open(ConfirmDialog)
      .afterClosed()
      .subscribe(async result => {
        if (result) {
          const res = await this.service.toggleItemCategoryDeleted(i);
          if (res) {
            this.service.getItemCategories(this.selectedItemGroupCategory.id);
          }
        }
      })
  }

  showItemCategoryBin() {
    this.dialog.open(ItemCategoryBinDialog, {
      data: {        
        'categoryGroup' : this.selectedItemGroupCategory
    }, width: '420px'
    })
      .afterClosed()
      .subscribe(() => {
        this.service.getItemCategories(this.selectedItemGroupCategory.id) })
  }

  consoleLogGroupCategory() {
    this.service.getItemCategories(this.selectedItemGroupCategory.id);
  }

}
