using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthorizedRegulationController : Controller
    {
        private AppDbContext db;

        public AuthorizedRegulationController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<AuthorizedRegulation>> GetAuthorizedRegulations() => await db.GetAuthorizedRegulations();

        [HttpGet("[action]")]
        public async Task<List<AuthorizedRegulation>> GetDeletedAuthorizedRegulations() => await db.GetDeletedAuthorizedRegulations();

        [HttpGet("[action]/{id}")]
        public async Task<AuthorizedRegulation> GetAuthorizedRegulation([FromRoute]int id) => await db.GetAuthorizedRegulation(id);

        [HttpPost("[action]")]
        public async Task AddAuthorizedRegulation([FromBody]AuthorizedRegulation authorizedRegulation) => await db.AddAuthorizedRegulation(authorizedRegulation);

        [HttpPost("[action]")]
        public async Task UpdateAuthorizedRegulation([FromBody]AuthorizedRegulation authorizedRegulation) => await db.UpdateAuthorizedRegulation(authorizedRegulation);

        [HttpPost("[action]")]
        public async Task ToggleAuthorizedRegulationDeleted([FromBody]int id) => await db.ToggleAuthorizedRegulationDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteAuthorizedRegulation([FromBody]int id) => await db.DeleteAuthorizedRegulation(id);
    }
}
