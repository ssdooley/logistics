import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';

import {
  ItemCategory,
  ItemGroupCategory
} from '../../models';

@Injectable()
export class ItemCategoryService {
  private itemGroupCategories = new BehaviorSubject<ItemGroupCategory[]>(null);
  private itemCategories = new BehaviorSubject<ItemCategory[]>(null);
  private deletedItemCategories = new BehaviorSubject<ItemCategory[]>(null);
  private itemCategory = new BehaviorSubject<ItemCategory>(null);

  itemGroupCategories$ = this.itemGroupCategories.asObservable();
  itemCategories$ = this.itemCategories.asObservable();
  deletedItemCategories$ = this.deletedItemCategories.asObservable();
  itemCategory$ = this.itemCategory.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  trackItemCategories = (itemCategory: ItemCategory) => itemCategory.id;

  getItemGroupCategories = () => this.http.get<ItemGroupCategory[]>('/api/itemCategory/getItemGroupCategories')
    .subscribe(
      data => this.itemGroupCategories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getItemCategories = (id: number) => this.http.get<ItemCategory[]>(`/api/itemCategory/getItemCategories/${id}`)
    .subscribe(
      data => this.itemCategories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getDeletedItemCategories = (id: number) => this.http.get<ItemCategory[]>(`/api/itemCategory/getDeletedItemCategories/${id}`)
    .subscribe(
      data => this.deletedItemCategories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  getItemCategory = (id: number) => this.http.get<ItemCategory>(`/api/itemCategory/getItemCategory/${id}`)
    .subscribe(
      data => this.itemCategory.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    )

  addItemCategory = (itemCategory: ItemCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/itemCategory/addItemCategory', itemCategory)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${itemCategory.label} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  updateItemCategory = (itemCategory: ItemCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/itemCategory/updateItemCategory', itemCategory)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${itemCategory.label} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  toggleItemCategoryDeleted = (itemCategory: ItemCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/itemCategory/toggleItemCategoryDeleted', itemCategory.id)
        .subscribe(
          () => {
            itemCategory.isDeleted ?
              this.snacker.sendSuccessMessage(`${itemCategory.label} successfully restored`) :
              this.snacker.sendSuccessMessage(`${itemCategory.label} successfully deleted`);

            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })

  deleteItemCategory = (itemCategory: ItemCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post('/api/itemCategory/deleteItemCategory', itemCategory.id)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${itemCategory.label} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          });
    })
}
