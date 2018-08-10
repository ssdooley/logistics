using System.Collections.Generic;

namespace Logistics.Data
{
    public class ApprovalGroup
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsLocal { get; set; }
        public bool IsCommander { get; set; }

        public List<ApprovalTemplateGroup> ApprovalTemplateGroups { get; set; }
        public List<Approver> Approvers { get; set; }
        public List<ItemGroupApproval> ItemGroupApprovals { get; set; }
    }
}
