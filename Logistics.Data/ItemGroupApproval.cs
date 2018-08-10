using System;

namespace Logistics.Data
{
    public class ItemGroupApproval
    {
        public int Id { get; set; }
        public int ApprovalGroupId { get; set; }
        public int ItemGroupId { get; set; }
        public int? UserId { get; set; }
        public bool IsApproved { get; set; }
        public bool IsRejected { get; set; }
        public bool IsPostponed { get; set; }
        public DateTime? PostponedUntil { get; set; }
        public DateTime? DateApproved { get; set; }

        public ApprovalGroup ApprovalGroup { get; set; }
        public ItemGroup ItemGroup { get; set; }
        public User User { get; set; }
    }
}
