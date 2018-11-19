using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class ManufacturerController : Controller
    {
        private AppDbContext db;

        public ManufacturerController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Manufacturer>> GetManufacturers() => await db.GetManufacturers();

        [HttpGet("[action]")]
        public async Task<List<Manufacturer>> GetDeletedManufacturers() => await db.GetDeletedManufacturers();

        [HttpGet("[action]/{id}")]
        public async Task<Manufacturer> GetManufacturer([FromRoute]int id) => await db.GetManufacturer(id);

        [HttpPost("[action]")]
        public async Task AddManufacturer([FromBody]Manufacturer manufacturer) => await db.AddManufacturer(manufacturer);

        [HttpPost("[action]")]
        public async Task UpdateManufacturer([FromBody]Manufacturer manufacturer) => await db.UpdateManufacturer(manufacturer);

        [HttpPost("[action]")]
        public async Task ToggleManufacturerDeleted([FromBody]int id) => await db.ToggleManufacturerDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteManufacturer([FromBody]int id) => await db.DeleteManufacturer(id);
    }
}
