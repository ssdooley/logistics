using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class VendorController : Controller
    {
        private AppDbContext db;

        public VendorController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Vendor>> GetVendors() => await db.GetVendors();

        [HttpGet("[action]")]
        public async Task<List<Vendor>> GetDeletedVendors() => await db.GetDeletedVendors();

        [HttpGet("[action]/{id}")]
        public async Task<Vendor> GetVendor([FromRoute]int id) => await db.GetVendor(id);

        [HttpPost("[action]")]
        public async Task AddVendor([FromBody]Vendor vendor) => await db.AddVendor(vendor);

        [HttpPost("[action]")]
        public async Task UpdateVendor([FromBody]Vendor vendor) => await db.UpdateVendor(vendor);

        [HttpPost("[action]")]
        public async Task ToggleVendorDeleted([FromBody]int id) => await db.ToggleVendorDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteVendor([FromBody]int id) => await db.DeleteVendor(id);
    }
}
