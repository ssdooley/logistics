using System.Collections.Generic;

namespace Logistics.Data
{
    public class Vendor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }

        public List<Order> Orders { get; set; }
    }
}
