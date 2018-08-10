using System;

namespace Logistics.Data
{
    public class InventoryVerification
    {
        public int Id { get; set; }
        public int InventoryId { get; set; }
        public int UserId { get; set; }
        public string Remarks { get; set; }
        public DateTime VerificationDate { get; set; }

        public Inventory Inventory { get; set; }
        public User User { get; set; }
    }
}
