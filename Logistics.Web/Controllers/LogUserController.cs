using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class LogUserController : Controller
    {
        private AppDbContext db;

        public LogUserController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<LogUser>> GetLogUsers() => await db.GetLogUsers();

        [HttpGet("[action]/{siteId}")]
        public async Task<List<LogUser>> GetSiteLogUsers([FromRoute]int siteId) => await db.GetSiteLogUsers(siteId);

        [HttpGet("[action]/{userId}")]
        public async Task<List<LogUser>> GetLogUserSites([FromRoute]int userId) => await db.GetLogUserSites(userId);

        [HttpGet("[action]/{siteId}/{userId}")]
        public async Task<LogUser> GetLogUser([FromRoute]int siteId, [FromRoute]int userId) => await db.GetLogUser(siteId, userId);

        [HttpPost("[action]")]
        public async Task AddLogUser([FromBody]LogUser logUser) => await db.AddLogUser(logUser);

        [HttpPost("[action]")]
        public async Task UpdateLogUser([FromBody]LogUser logUser) => await db.UpdateLogUser(logUser);

        [HttpPost("[action]")]
        public async Task RemoveLogUser([FromBody]int logUserId) => await db.RemoveLogUser(logUserId);
    }
}
