namespace Logistics.Data
{
    public class ApprovalTemplateGroup
    {
        public int Id { get; set; }
        public int ApprovalGroupId { get; set; }
        public int ApprovalTemplateId { get; set; }

        public ApprovalGroup ApprovalGroup { get; set; }
        public ApprovalTemplate ApprovalTemplate { get; set; }
    }
}
