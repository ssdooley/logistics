namespace Logistics.Data
{
    public class LogUser
    {
        public int Id { get; set; }
        public int SiteId { get; set; }
        public int UserId { get; set; }

        public Site Site { get; set; }
        public User User { get; set; }
    }
}
