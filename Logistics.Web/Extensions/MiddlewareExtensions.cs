using Logistics.Web.Infrastructure;

namespace Microsoft.AspNetCore.Builder
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseUserMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserMiddleware>();
        }
    }
}
