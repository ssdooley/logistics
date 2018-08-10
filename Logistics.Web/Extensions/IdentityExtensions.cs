using Logistics.Data;
using Logistics.Web.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
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
            user.IsAdmin = !user.IsAdmin;
            await db.SaveChangesAsync();
        }

        public static IApplicationBuilder UseUserMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserMiddleware>();
        }

        public static async Task<User> AddOrUpdate(this UserPrincipal principal, AppDbContext db)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Guid == principal.Guid.Value);

            if (user == null)
            {
                user = principal.ToUser();
                await db.AddUser(user);
            }
            else
            {
                await principal.UpdateUser(user);
                user = await db.UpdateUser(user);
            }

            return user;
        }

        public static User ToUser(this UserPrincipal principal)
        {
            return new User
            {
                Guid = principal.Guid.Value,
                Email = principal.UserPrincipalName,
                Username = principal.DisplayName
            };
        }

        public static async Task UpdateUser(this UserPrincipal principal, User user)
        {
            user.Guid = principal.Guid.Value;
            user.Email = principal.UserPrincipalName;
            user.Username = await principal.SetDisplayName();
        }

        private static async Task<String> SetDisplayName(this UserPrincipal principal)
        {
            var rank = await principal.GetProperty("title");
            var splitName = principal.SamAccountName.Split('.');
            string displayName;

            if (splitName.Count() > 1)
            {
                displayName = ($"{rank} {splitName[1]}, {splitName[0]}").Trim();
            }
            else
            {
                displayName = ($"{rank} {principal.DisplayName}").Trim();
            }

            return displayName;
        }

        private static Task<string> GetProperty(this UserPrincipal principal, string property)
        {
            return Task.Run(() =>
            {
                try
                {
                    DirectoryEntry entry = principal.GetUnderlyingObject() as DirectoryEntry;

                    if (entry.Properties.Contains(property))
                    {
                        return entry.Properties[property].Value.ToString();
                    }

                    return string.Empty;
                }
                catch
                {
                    return string.Empty;
                }
            });
        }
    }
}
