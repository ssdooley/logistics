using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class LogUserExtensions
    {
        public static IQueryable<LogUser> SetIncludes(this DbSet<LogUser> logUsers)
        {
            return logUsers.Include(x => x.User)
                .Include(x => x.Site);
        }

        public static async Task<List<LogUser>> GetLogUsers(this AppDbContext db)
        {
            var model = await db.LogUsers
                .SetIncludes()
                .ToListAsync();

            return model;
        }

        public static async Task<List<LogUser>> GetSiteLogUsers(this AppDbContext db, int siteId)
        {
            var model = await db.LogUsers
                .SetIncludes()
                .Where(x => x.SiteId == siteId)
                .ToListAsync();

            return model;
        }

        public static async Task<List<LogUser>> GetLogUserSites(this AppDbContext db, int userId)
        {
            var model = await db.LogUsers
                .SetIncludes()
                .Where(x => x.UserId == userId)
                .ToListAsync();

            return model;
        }

        public static async Task<LogUser> GetLogUser(this AppDbContext db, int userId, int siteId)
        {
            var model = await db.LogUsers
                .SetIncludes()
                .FirstOrDefaultAsync(x => 
                    x.UserId == userId && 
                    x.SiteId == siteId
                );

            return model;
        }

        public static async Task AddLogUser(this AppDbContext db, LogUser logUser)
        {
            if (await logUser.Validate(db))
            {
                db.LogUsers.Attach(logUser);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateLogUser(this AppDbContext db, LogUser logUser)
        {
            if (await logUser.Validate(db))
            {
                db.LogUsers.Update(logUser);
                await db.SaveChangesAsync();
            }
        }

        public static async Task RemoveLogUser(this AppDbContext db, int logUserId)
        {
            var logUser = await db.LogUsers.FindAsync(logUserId);
            db.LogUsers.Remove(logUser);
            await db.SaveChangesAsync();
        }

        private static async Task<bool> Validate(this LogUser model, AppDbContext db)
        {
            if (model.SiteId < 1)
            {
                throw new Exception("User permissions must include a Site");
            }

            if (model.UserId < 1)
            {
                throw new Exception("User permissions must include a User");
            }

            var check = model.Id > 0 ?
                await db.LogUsers.FirstOrDefaultAsync(x =>
                    x.SiteId == model.SiteId &&
                    x.UserId == model.UserId &&
                    !(x.Id == model.Id)
                ) :
                await db.LogUsers.FirstOrDefaultAsync(x =>
                    x.SiteId == model.SiteId &&
                    x.UserId == model.UserId
                );

            if (check != null)
            {
                throw new Exception($"{model.User.Username} already has permissions to {model.Site.Name}");
            }

            return true;
                
        }
    }
}
