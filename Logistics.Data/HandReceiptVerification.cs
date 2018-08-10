using System;

namespace Logistics.Data
{
    public class HandReceiptVerification
    {
        public int Id { get; set; }
        public int HandReceiptId { get; set; }
        public int LogUserId { get; set; }
        public int? RecordUserId { get; set; }
        public string Remarks { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime? DateVerified { get; set; }

        public HandReceipt HandReceipt { get; set; }
        public User LogUser { get; set; }
        public User RecordUser { get; set; }
    }
}
