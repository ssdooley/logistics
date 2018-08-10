using System;
using System.Collections.Generic;

namespace Logistics.Data
{
    public class Transfer
    {
        public int Id { get; set; }
        public int DestinationRecordId { get; set; }
        public int OriginRecordId { get; set; }
        public int UserId { get; set; }
        public string Remarks { get; set; }
        public bool IsReceived { get; set; }
        public DateTime TransferDate { get; set; }

        public PropertyRecord DestinationRecord { get; set; }
        public PropertyRecord OriginRecord { get; set; }
        public TransferReceipt TransferReceipt { get; set; }
        public User User { get; set; }

        public List<TransferItem> TransferItems { get; set; }
    }
}
