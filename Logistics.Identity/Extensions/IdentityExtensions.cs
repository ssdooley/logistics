using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Identity.Extensions
{
    public static class IdentityExtensions
    {
        public static IQueryable<UserPrincipal> FilterUsers(this IQueryable<UserPrincipal> principals) =>
            principals.Where(x => x.Guid.HasValue);

        public static IQueryable<ADUser> SelectADUsers(this IQueryable<UserPrincipal> principals) =>
            principals.Select(x => ADUser.CastToADUser(x));

        public static async Task<string> SetDisplayName(this UserPrincipal principal)
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

        public static Task<string> GetProperty(this UserPrincipal principal, string property)
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
