using System.Collections.Generic;

namespace Logistics.Data
{
    public class Site
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public List<ApprovalTemplate> ApprovalTemplates { get; set; }
        public List<HandReceipt> HandReceipts { get; set; }
        public List<ItemGroup> ItemGroups { get; set; }
        public List<LogUser> LogUsers { get; set; }
        public List<NsnItem> NsnItems { get; set; }
        public List<PropertyRecord> PropertyRecords { get; set; }
        public List<Request> Requests { get; set; }
        public List<SoftwareItem> SoftwareItems { get; set; }
    }
}
