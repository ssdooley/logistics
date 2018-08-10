using System.Collections.Generic;

namespace Logistics.Data
{
    public class ItemGroupCategory
    {
        public int Id { get; set; }
        public string Label { get; set; }

        public List<ItemCategory> ItemCategories { get; set; }
        public List<ItemGroup> ItemGroups { get; set; }
    }
}
