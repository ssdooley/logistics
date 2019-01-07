using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Data.Extensions
{
    public static class AuthorizedRegulationExtensions
    {
        public static async Task<List<AuthorizedRegulation>> GetAuthorizedRegulations(this AppDbContext db)
        {
            var model = await db.AuthorizedRegulations
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<AuthorizedRegulation>> GetDeletedAuthorizedRegulations(this AppDbContext db)
        {
            var model = await db.AuthorizedRegulations
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<AuthorizedRegulation> GetAuthorizedRegulation(this AppDbContext db, int id)
        {
            var model = await db.AuthorizedRegulations.FindAsync(id);
            return model;
        }

        public static async Task AddAuthorizedRegulation(this AppDbContext db, AuthorizedRegulation authorizedRegulation)
        {
            if (await authorizedRegulation.Validate(db))
            {
                await db.AuthorizedRegulations.AddAsync(authorizedRegulation);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateAuthorizedRegulation(this AppDbContext db, AuthorizedRegulation authorizedRegulation)
        {
            if (await authorizedRegulation.Validate(db))
            {
                var a = await db.AuthorizedRegulations.FindAsync(authorizedRegulation.Id);
                a.Name = authorizedRegulation.Name;
                a.Reference = authorizedRegulation.Reference;
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleAuthorizedRegulationDeleted(this AppDbContext db, int authorizedRegulactionId)
        {
            var authorizedRegulation = await db.AuthorizedRegulations.FindAsync(authorizedRegulactionId);
            authorizedRegulation.IsDeleted = !authorizedRegulation.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeleteAuthorizedRegulation(this AppDbContext db, int authorizedRegulationId)
        {
           
                var authorizedRegulation = await db.AuthorizedRegulations.FindAsync(authorizedRegulationId);
                db.AuthorizedRegulations.Remove(authorizedRegulation);
                await db.SaveChangesAsync();
        }
              

        private static async Task<bool> Validate(this AuthorizedRegulation model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Authorized Regulation must have a label");
            }

            var check = model.Id > 0 ?
                await db.AuthorizedRegulations.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower() && x.Id == model.Id) :
                await db.AuthorizedRegulations.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower());

            if (check != null)
            {
                throw new Exception("The provided Authorized Regulation already exists");
            }

            return true;
        }
    }
}
