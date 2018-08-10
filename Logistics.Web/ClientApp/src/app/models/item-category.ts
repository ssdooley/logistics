import { Item } from './item';
import { ItemGroupCategory } from './item-group-category';
import { Manufacturer } from './manufacturer';

export class ItemCategory {
  id: number;
  itemGroupCategoryId: number;
  label: string;
  isDeleted: boolean;
  itemGroupCategory: ItemGroupCategory;
  items: Item[];
  manufacturers: Manufacturer[];
}
