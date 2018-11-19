using System.DirectoryServices.AccountManagement;
using System.Linq;

namespace Logistics.Identity.Extensions
{
    public static class IdentityExtensions
    {
        public static IQueryable<UserPrincipal> FilterUsers(this IQueryable<UserPrincipal> principals) =>
            principals.Where(x => x.Guid.HasValue);

        public static IQueryable<ADUser> SelectADUsers(this IQueryable<UserPrincipal> principals) =>
            principals.Select(x => ADUser.CastToADUser(x));
    }
}
