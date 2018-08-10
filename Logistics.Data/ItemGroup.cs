using System.Collections.Generic;

namespace Logistics.Data
{
    public class ItemGroup
    {
        public int Id { get; set; }
        public int FundingAccountId { get; set; }
        public int ItemGroupCategoryId { get; set; }
        public int RequestId { get; set; }
        public int SiteId { get; set; }
        public int UserId { get; set; }

        public FundingAccount FundingAccount { get; set; }
        public ItemGroupCategory ItemGroupCategory { get; set; }
        public Request Request { get; set; }
        public Site Site { get; set; }
        public User User { get; set; }

        public List<ItemGroupApproval> ItemGroupApprovals { get; set; }
        public List<Order> Orders { get; set; }
        public List<RequestItem> RequestItems { get; set; }
    }
}
