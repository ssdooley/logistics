namespace Logistics.Data
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public int InventoryId { get; set; }
        public int ItemId { get; set; }
        public bool IsAccounted { get; set; }
        public bool IsMissing { get; set; }
        public string Remarks { get; set; }

        public Inventory Inventory { get; set; }
        public Item Item { get; set; }
    }
}
