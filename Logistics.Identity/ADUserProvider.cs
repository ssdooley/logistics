using Logistics.Identity.Extensions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Identity
{
    public class ADUserProvider : IUserProvider
    {
        public ADUser CurrentUser { get; set; }

        public bool Initialized { get; set; }

        public async Task Create(HttpContext context)
        {
            CurrentUser = await GetADUser(context.User.Identity);
            Initialized = true;
        }

        public Task Create(string samAccountName) => throw new NotImplementedException("Use Create(HttpContext context) for UserProvider");

        public Task<ADUser> GetADUser(IIdentity identity)
        {
            return Task.Run(() =>
            {
                try
                {
                    PrincipalContext context = new PrincipalContext(ContextType.Domain);
                    UserPrincipal principal = new UserPrincipal(context);

                    if (context != null)
                    {
                        principal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, identity.Name);
                    }

                    return ADUser.CastToADUser(principal);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        public Task<ADUser> GetADUser(Guid guid)
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

                    return ADUser.CastToADUser(principal);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        public Task<ADUser> GetADUser(string samAccountName)
        {
            return Task.Run(() =>
            {
                try
                {
                    PrincipalContext context = new PrincipalContext(ContextType.Domain);
                    UserPrincipal principal = new UserPrincipal(context);

                    if (context != null)
                    {
                        principal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, samAccountName);
                    }

                    return ADUser.CastToADUser(principal);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        public Task<List<ADUser>> GetDomainUsers()
        {
            return Task.Run(() =>
            {
                PrincipalContext context = new PrincipalContext(ContextType.Domain);
                UserPrincipal principal = new UserPrincipal(context)
                {
                    UserPrincipalName = "*@*",
                    DisplayName = "*,*",
                    Enabled = true
                };
                PrincipalSearcher searcher = new PrincipalSearcher(principal);

                var users = searcher.FindAll()
                    .AsQueryable()
                    .Cast<UserPrincipal>()
                    .FilterUsers()
                    .SelectADUsers()
                    .OrderBy(x => x.Surname)
                    .ToList();

                return users;
            });
        }

        public Task<List<ADUser>> FindDomainUser(string search)
        {
            return Task.Run(() =>
            {
                PrincipalContext context = new PrincipalContext(ContextType.Domain);
                UserPrincipal principal = new UserPrincipal(context)
                {
                    SamAccountName = $"*{search}*",
                    DisplayName = "*,*",
                    Enabled = true
                };
                PrincipalSearcher searcher = new PrincipalSearcher(principal);

                var users = searcher.FindAll()
                    .AsQueryable()
                    .Cast<UserPrincipal>()
                    .FilterUsers()
                    .SelectADUsers()
                    .OrderBy(x => x.Surname)
                    .ToList();

                return users;
            });
        }
    }
}
