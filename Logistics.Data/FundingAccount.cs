using System.Collections.Generic;

namespace Logistics.Data
{
    public class FundingAccount
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<FundTransaction> FundTransactions { get; set; }
        public List<FundUser> FundUsers { get; set; }
        public List<ItemGroup> ItemGroups { get; set; }
    }
}
