using System;

namespace Logistics.Data
{
    public class ItemDecommissionVerification
    {
        public int Id { get; set; }
        public int ItemDecommissionId { get; set; }
        public int UserId { get; set; }
        public string Remarks { get; set; }
        public DateTime VerificationDate { get; set; }

        public ItemDecommission ItemDecommission { get; set; }
        public User User { get; set; }
    }
}
