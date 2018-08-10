import { ItemCategory } from './item-category';
import { ItemGroup } from './item-group';

export class ItemGroupCategory {
  id: number;
  label: string;
  itemCategories: ItemCategory[];
  itemGroups: ItemGroup[];
}
