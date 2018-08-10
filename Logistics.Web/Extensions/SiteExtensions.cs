using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class SiteExtensions
    {
        public static async Task<List<Site>> GetSites(this AppDbContext db)
        {
            var model = await db.Sites
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<Site>> GetDeletedSites(this AppDbContext db)
        {
            var model = await db.Sites
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<Site> GetSite(this AppDbContext db, int id)
        {
            var model = await db.Sites.FindAsync(id);
            return model;
        }

        public static async Task AddSite(this AppDbContext db, Site site)
        {
            if (await site.Validate(db))
            {
                await db.Sites.AddAsync(site);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateSite(this AppDbContext db, Site site)
        {
            if (await site.Validate(db))
            {
                var s = await db.Sites.FindAsync(site.Id);
                s.Name = site.Name;
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleSiteDeleted(this AppDbContext db, int siteId)
        {
            var site = await db.Sites.FindAsync(siteId);
            site.IsDeleted = !site.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeleteSite(this AppDbContext db, int siteId)
        {
            if (await db.SiteEmpty(siteId))
            {
                var site = await db.Sites.FindAsync(siteId);
                db.Sites.Remove(site);
                await db.SaveChangesAsync();
            }
        }

        private static async Task<bool> SiteEmpty(this AppDbContext db, int siteId)
        {
            var ex = "Site has dependent records. Contact dev to delete.";

            dynamic check = await db.Requests.FirstOrDefaultAsync(x => x.SiteId == siteId);
            if (check != null) throw new Exception(ex);

            check = await db.PropertyRecords.FirstOrDefaultAsync(x => x.SiteId == siteId);
            if (check != null) throw new Exception(ex);

            check = await db.NsnItems.FirstOrDefaultAsync(x => x.SiteId == siteId);
            if (check != null) throw new Exception(ex);

            check = await db.SoftwareItems.FirstOrDefaultAsync(x => x.SiteId == siteId);
            if (check != null) throw new Exception(ex);

            check = await db.HandReceipts.FirstOrDefaultAsync(x => x.SiteId == siteId);
            if (check != null) throw new Exception(ex);

            return true;
        }

        private static async Task<bool> Validate(this Site model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Site must have a name");
            }

            var check = model.Id > 0 ?
                await db.Sites.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower() && x.Id == model.Id) :
                await db.Sites.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower());

            if (check != null)
            {
                throw new Exception("The provided Site already exists");
            }

            return true;
        }
    }
}
