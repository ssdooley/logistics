import { Item } from './item';
import { ItemCategory } from './item-category';

export class Manufacturer {
  id: number;
  itemCategoryId: number;
  name: string;
  isDeleted: boolean;
  itemCategory: ItemCategory;
  items: Item[];
}
