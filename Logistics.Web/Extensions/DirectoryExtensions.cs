using Logistics.Data;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class DirectoryExtensions
    {
        public static Task<UserPrincipal> GetUserPrincipal(this IIdentity identity)
        {
            return Task.Run(() =>
            {
                try
                {
                    WindowsIdentity windowsIdentity = identity as WindowsIdentity;
                    PrincipalContext context = new PrincipalContext(ContextType.Domain);
                    UserPrincipal principal = new UserPrincipal(context);

                    if (context != null)
                    {
                        principal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, windowsIdentity.Name);
                    }

                    return principal;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        public static Task<UserPrincipal> GetUserPrincipal(this Guid guid)
        {
            return Task.Run(() =>
            {
                try
                {
                    PrincipalContext context = new PrincipalContext(ContextType.Domain);
                    UserPrincipal principal = new UserPrincipal(context);

                    if (context != null)
                    {
                        principal = UserPrincipal.FindByIdentity(context, IdentityType.Guid, guid.ToString());
                    }

                    return principal;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        public static Task<List<User>> FindDomainUser(this string username)
        {
            return Task.Run(() =>
            {
                PrincipalContext context = new PrincipalContext(ContextType.Domain);
                UserPrincipal principal = new UserPrincipal(context);
                principal.UserPrincipalName = $"*{username}*";
                principal.DisplayName = "*,*";
                principal.Enabled = true;
                PrincipalSearcher searcher = new PrincipalSearcher(principal);

                var users = searcher.FindAll()
                    .AsQueryable()
                    .Cast<UserPrincipal>()
                    .FilterUsers()
                    .SelectUsers()
                    .OrderBy(x => x.Username)
                    .ToList();

                return users;
            });
        }

        public static Task<List<User>> GetDomainUsers()
        {
            return Task.Run(() =>
            {
                PrincipalContext context = new PrincipalContext(ContextType.Domain);
                UserPrincipal principal = new UserPrincipal(context);
                principal.UserPrincipalName = "*@*";
                principal.DisplayName = "*,*";
                principal.Enabled = true;
                PrincipalSearcher searcher = new PrincipalSearcher(principal);

                var users = searcher.FindAll()
                    .AsQueryable()
                    .Cast<UserPrincipal>()
                    .FilterUsers()
                    .SelectUsers()
                    .ToList();

                return users;
            });
        }

        private static IQueryable<UserPrincipal> FilterUsers(this IQueryable<UserPrincipal> users)
        {
            return users.Where(x => x.Guid.HasValue);
        }

        private static IQueryable<User> SelectUsers(this IQueryable<UserPrincipal> users)
        {
            return users.Select(x => new User
            {
                Guid = x.Guid.Value,
                Username = x.DisplayName,
                Email = x.UserPrincipalName
            });
        }
    }
}
