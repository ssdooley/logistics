using Logistics.Data;
using Logistics.Data.Extensions;
using Logistics.Identity;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Logistics.Web.Infrastructure
{
    public class UserManager
    {
        private AppDbContext db;
        private IUserProvider provider;
        public User CurrentUser { get; set; }
        public bool Initialized { get; set; }

        public UserManager(AppDbContext db, IUserProvider provider)
        {
            this.db = db;
            this.provider = provider;
        }

        public async Task Create(HttpContext context)
        {
            CurrentUser = await provider.CurrentUser.AddOrUpdate(db);
            Initialized = true;
        }
    }
}
