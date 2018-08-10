using Logistics.Data;
using Logistics.Web.Extensions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Infrastructure
{
    public class UserManager
    {
        private AppDbContext db;
        public User CurrentUser { get; set; }
        public bool Initialized { get; set; }

        public UserManager(AppDbContext db)
        {
            this.db = db;
        }

        public async Task Create(HttpContext context)
        {
            var userPrincipal = await context.User.Identity.GetUserPrincipal();
            CurrentUser = await userPrincipal.AddOrUpdate(db);
            Initialized = true;
        }

        public void Dispose()
        {
            CurrentUser = new User();
            Initialized = false;
        }
    }
}
