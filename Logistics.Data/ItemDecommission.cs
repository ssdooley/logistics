using System;

namespace Logistics.Data
{
    public class ItemDecommission
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public string Remarks { get; set; }
        public bool IsVerified { get; set; }
        public DateTime DecommissionDate { get; set; }

        public Item Item { get; set; }
        public ItemDecommissionVerification ItemDecommissionVerification { get; set; }
        public User User { get; set; }
    }
}
