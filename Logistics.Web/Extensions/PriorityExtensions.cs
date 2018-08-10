using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class PriorityExtensions
    {
        public static async Task<List<Priority>> GetPriorities(this AppDbContext db)
        {
            var model = await db.Priorities
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<Priority>> GetDeletedPriorities(this AppDbContext db)
        {
            var model = await db.Priorities
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<Priority> GetPriority(this AppDbContext db, int id)
        {
            var model = await db.Priorities.FindAsync(id);
            return model;
        }

        public static async Task AddPriority(this AppDbContext db, Priority priority)
        {
            if (await priority.Validate(db))
            {
                await db.Priorities.AddAsync(priority);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdatePriority(this AppDbContext db, Priority priority)
        {
            if (await priority.Validate(db))
            {
                var p = await db.Priorities.FindAsync(priority.Id);
                p.Label = priority.Label;
                await db.SaveChangesAsync();
            }
        }

        public static async Task TogglePriorityDeleted(this AppDbContext db, int priorityId)
        {
            var priority = await db.Priorities.FindAsync(priorityId);
            priority.IsDeleted = !priority.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeletePriority(this AppDbContext db, int priorityId)
        {
            if (await db.PriorityEmpty(priorityId))
            {
                var priority = await db.Priorities.FindAsync(priorityId);
                db.Priorities.Remove(priority);
                await db.SaveChangesAsync();
            }
        }

        private static async Task<bool> PriorityEmpty(this AppDbContext db, int priorityId)
        {
            var ex = "Priority has dependent records. Contact dev to delete.";

            dynamic check = await db.Requests.FirstOrDefaultAsync(x => x.PriorityId == priorityId);
            if (check != null) throw new Exception(ex);

            return true;
        }

        private static async Task<bool> Validate(this Priority model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Label))
            {
                throw new Exception("Priority must have a label");
            }

            var check = model.Id > 0 ?
                await db.Priorities.FirstOrDefaultAsync(x => x.Label.ToLower() == model.Label.ToLower() && x.Id == model.Id) :
                await db.Priorities.FirstOrDefaultAsync(x => x.Label.ToLower() == model.Label.ToLower());

            if (check != null)
            {
                throw new Exception("The provided Priority already exists");
            }

            return true;
        }
    }
}
