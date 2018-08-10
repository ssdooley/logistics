using System;
using System.Collections.Generic;

namespace Logistics.Data
{
    public class Order
    {
        public int Id { get; set; }
        public int ItemGroupId { get; set; }
        public int UserId { get; set; }
        public int VendorId { get; set; }
        public double Cost { get; set; }
        public string TrackingNumber { get; set; }
        public string Remarks { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsReceived { get; set; }

        public ItemGroup ItemGroup { get; set; }
        public User User { get; set; }
        public Vendor Vendor { get; set; }

        public List<FundTransaction> FundTransactions { get; set; }
        public List<Item> Items { get; set; }
        public List<OrderAttachment> OrderAttachments { get; set; }
    }
}
