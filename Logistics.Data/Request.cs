using System;
using System.Collections.Generic;

namespace Logistics.Data
{
    public class Request
    {
        public int Id { get; set; }
        public int PriorityId { get; set; }
        public int SiteId { get; set; }
        public int UserId { get; set; }
        public Guid Guid { get; set; }
        public string Subject { get; set; }
        public string Requirement { get; set; }
        public string AuthorizedRegulation { get; set; }
        public DateTime DateSubmitted { get; set; }
        public DateTime LastModified { get; set; }

        public bool IsRecurring { get; set; }
        public DateTime? RenewalDate { get; set; }

        public bool IsApproved { get; set; }
        public bool IsComplete { get; set; }

        public Priority Priority { get; set; }
        public Site Site { get; set; }
        public User User { get; set; }

        public List<ItemGroup> ItemGroups { get; set; }
        public List<RequestAttachment> RequestAttachments { get; set; }
        public List<RequestItem> RequestItems { get; set; }
    }
}
