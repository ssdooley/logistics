import { Component, OnInit } from '@angular/core';
import { ItemCategoryService } from '../../../services/item-category.service';

@Component({
  selector: 'admin-item-categories',
  templateUrl: 'admin-item-categories.component.html',
  providers: [ ItemCategoryService ]
})
export class AdminItemCategoriesComponent implements OnInit {
  constructor(
    public service: ItemCategoryService
  ) { }

  ngOnInit() {
    this.service.getItemGroupCategories();
  }
}
