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
    public class SiteController : Controller
    {
        private AppDbContext db;

        public SiteController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Site>> GetSites() => await db.GetSites();

        [HttpGet("[action]")]
        public async Task<List<Site>> GetDeletedSites() => await db.GetDeletedSites();

        [HttpGet("[action]/{id}")]
        public async Task<Site> GetSite([FromRoute]int id) => await db.GetSite(id);

        [HttpPost("[action]")]
        public async Task AddSite([FromBody]Site site) => await db.AddSite(site);

        [HttpPost("[action]")]
        public async Task UpdateSite([FromBody]Site site) => await db.UpdateSite(site);

        [HttpPost("[action]")]
        public async Task ToggleSiteDeleted([FromBody]int id) => await db.ToggleSiteDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteSite([FromBody]int id) => await db.DeleteSite(id);
    }
}
