using System;
using System.Collections.Generic;

namespace Logistics.Data
{
    public class User
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsDeleted { get; set; }

        public List<Approver> Approvers { get; set; }
        public List<FundUser> FundUsers { get; set; }
        public List<HandReceipt> HandReceipts { get; set; }
        public List<HandReceiptVerification> LogHandReceiptVerifications { get; set; }
        public List<HandReceiptVerification> RecordHandReceiptVerifications { get; set; }
        public List<Inventory> Inventories { get; set; }
        public List<InventoryVerification> InventoryVerifications { get; set; }
        public List<ItemDecommission> ItemDecommissions { get; set; }
        public List<ItemDecommissionVerification> ItemDecommissionVerifications { get; set; }
        public List<ItemGroup> ItemGroups { get; set; }
        public List<ItemGroupApproval> ItemGroupApprovals { get; set; }
        public List<ItemReceipt> ItemReceipts { get; set; }
        public List<LogUser> LogUsers { get; set; }
        public List<Order> Orders { get; set; }
        public List<PropertyCustodian> PropertyCustodians { get; set; }
        public List<Request> Requests { get; set; }
        public List<Transfer> Transfers { get; set; }
        public List<TransferReceipt> TransferReceipts { get; set; }
    }
}
