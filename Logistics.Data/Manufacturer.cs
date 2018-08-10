using System.Collections.Generic;

namespace Logistics.Data
{
    public class Manufacturer
    {
        public int Id { get; set; }
        public int ItemCategoryId { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public ItemCategory ItemCategory { get; set; }

        public List<Item> Items { get; set; }
    }
}
