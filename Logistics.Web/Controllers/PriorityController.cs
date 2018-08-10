using Logistics.Data;
using Logistics.Web.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class PriorityController : Controller
    {
        private AppDbContext db;

        public PriorityController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Priority>> GetPriorities() => await db.GetPriorities();

        [HttpGet("[action]")]
        public async Task<List<Priority>> GetDeletedPriorities() => await db.GetDeletedPriorities();

        [HttpGet("[action]/{id}")]
        public async Task<Priority> GetPriority([FromRoute]int id) => await db.GetPriority(id);

        [HttpPost("[action]")]
        public async Task AddPriority([FromBody]Priority priority) => await db.AddPriority(priority);

        [HttpPost("[action]")]
        public async Task UpdatePriority([FromBody]Priority priority) => await db.UpdatePriority(priority);

        [HttpPost("[action]")]
        public async Task TogglePriorityDeleted([FromBody]int id) => await db.TogglePriorityDeleted(id);

        [HttpPost("[action]")]
        public async Task DeletePriority([FromBody]int id) => await db.DeletePriority(id);
    }
}
