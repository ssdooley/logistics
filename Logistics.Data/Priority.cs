using System.Collections.Generic;

namespace Logistics.Data
{
    public class Priority
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsDeleted { get; set; }

        public List<Request> Requests { get; set; }
    }
}
