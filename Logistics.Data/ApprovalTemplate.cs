using System.Collections.Generic;

namespace Logistics.Data
{
    public class ApprovalTemplate
    {
        public int Id { get; set; }
        public int SiteId { get; set; }
        public string Name { get; set; }

        public Site Site { get; set; }

        public List<ApprovalTemplateGroup> ApprovalTemplateGroups { get; set; }
    }
}
