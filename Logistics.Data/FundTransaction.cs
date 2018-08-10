using System;

namespace Logistics.Data
{
    public class FundTransaction
    {
        public int Id { get; set; }
        public int FundingAccountId { get; set; }
        public int? OrderId { get; set; }
        public int UserId { get; set; }
        public string Label { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }

        public FundingAccount FundingAccount { get; set; }
        public Order Order { get; set; }
        public User User { get; set; }
    }
}
