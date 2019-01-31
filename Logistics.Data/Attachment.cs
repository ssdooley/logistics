using System;

namespace Logistics.Data
{
    public class Attachment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string File { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Url { get; set; }
        public bool IsDeleted { get; set; }
        public string AttachmentType { get; set; }
        public DateTime DateUploaded { get; set; }

        public User User { get; set; }
    }

    public class OrderAttachment : Attachment
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }

    public class RequestAttachment : Attachment
    {
        public int RequestId { get; set; }
        public Request Request { get; set; }
    }
}
