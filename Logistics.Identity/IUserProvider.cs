using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Identity
{
    public interface IUserProvider
    {
        ADUser CurrentUser { get; set; }
        bool Initialized { get; set; }
        Task Create(HttpContext context);
        Task Create(string samAccountName);
        Task<ADUser> GetADUser(IIdentity identity);
        Task<ADUser> GetADUser(string samAccountName);
        Task<ADUser> GetADUser(Guid guid);
        Task<List<ADUser>> GetDomainUsers();
        Task<List<ADUser>> FindDomainUser(string search);
    }
}
