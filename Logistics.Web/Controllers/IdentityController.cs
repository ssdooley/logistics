using Logistics.Data;
using Logistics.Data.Extensions;
using Logistics.Identity;
using Logistics.Web.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private AppDbContext db;
        private UserManager manager;
        private IUserProvider provider;

        public IdentityController(AppDbContext db, UserManager manager, IUserProvider provider)
        {
            this.db = db;
            this.manager = manager;
            this.provider = provider;
        }

        [HttpGet("[action]")]
        public User GetCurrentUser() => manager.CurrentUser;

        [HttpGet("[action]")]
        public async Task<List<User>> GetUsers() => await db.GetUsers();

        [HttpGet("[action]")]
        public async Task<List<User>> GetAdminUsers() => await db.GetAdminUsers();

        [HttpGet("[action]")]
        public async Task<List<User>> GetDeletedUsers() => await db.GetDeletedUsers();

        [HttpGet("[action]/{userId}")]
        public async Task<User> GetUser([FromRoute]int userId) => await db.GetUser(userId);

        [HttpGet("[action]/{user}")]
        public async Task<List<ADUser>> FindDomainUser([FromRoute]string user) => await provider.FindDomainUser(user);

        [HttpPost("[action]")]
        public async Task AddUser([FromBody]User user) => await db.AddUser(user);

        [HttpPost("[action]")]
        public async Task UpdateUser([FromBody]User user) => await db.UpdateUser(user);

        [HttpPost("[action]")]
        public async Task ToggleUserIsAdmin([FromBody]int userId) => await db.ToggleUserIsAdmin(userId);

        [HttpPost("[action]")]
        public async Task ToggleUserIsDeleted([FromBody]int userId) => await db.ToggleUserIsDeleted(userId);
    }
}
