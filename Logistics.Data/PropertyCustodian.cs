namespace Logistics.Data
{
    public class PropertyCustodian
    {
        public int Id { get; set; }
        public int PropertyRecordId { get; set; }
        public int UserId { get; set; }

        public PropertyRecord PropertyRecord { get; set; }
        public User User { get; set; }
    }
}
