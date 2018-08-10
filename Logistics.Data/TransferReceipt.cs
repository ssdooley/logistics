using System;

namespace Logistics.Data
{
    public class TransferReceipt
    {
        public int Id { get; set; }
        public int TransferId { get; set; }
        public int UserId { get; set; }
        public string Remarks { get; set; }
        public DateTime ReceiptDate { get; set; }

        public Transfer Transfer { get; set; }
        public User User { get; set; }
    }
}
