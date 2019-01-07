using Logistics.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Data.Extensions
{
    public static class IdentityExtensions
    {
        public static async Task<List<User>> GetUsers(this AppDbContext db)
        {
            var model = await db.Users
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<User>> GetAdminUsers(this AppDbContext db)
        {
            var model = await db.Users
                .Where(x => !x.IsDeleted && x.IsAdmin)
                .ToListAsync();

            return model;
        }

        public static async Task<List<User>> GetDeletedUsers(this AppDbContext db)
        {
            var model = await db.Users
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<User> GetUser(this AppDbContext db, int userId)
        {
            var user = await db.Users.FindAsync(userId);
            return user;
        }

        public static async Task<User> AddUser(this AppDbContext db, User user)
        {
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return user;
        }

        public static async Task<User> UpdateUser(this AppDbContext db, User user)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return user;
        }

        public static async Task ToggleUserIsAdmin(this AppDbContext db, int userId)
        {
            var user = await db.GetUser(userId);
            user.IsAdmin = !user.IsAdmin;
            await db.SaveChangesAsync();
        }

        public static async Task ToggleUserIsDeleted(this AppDbContext db, int userId)
        {
            var user = await db.GetUser(userId);
            user.IsDeleted = !user.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task<User> AddOrUpdate(this ADUser principal, AppDbContext db)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Guid == principal.Guid.Value);

            if (user == null)
            {
                user = principal.ToUser();
                await db.AddUser(user);
            }
            else
            {
                user = principal.ToUser(user.Id);
                await db.SaveChangesAsync();
            }

            return user;
        }

        public static User ToUser(this ADUser user, int? id = null)
        {
            var u = new User
            {
                Guid = user.Guid.Value,
                Email = user.UserPrincipalName,
                Username = user.DisplayName
            };

            if (id.HasValue)
                u.Id = id.Value;

            return u;
        }
    }
}
