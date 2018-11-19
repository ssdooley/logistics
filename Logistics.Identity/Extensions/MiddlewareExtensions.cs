using Logistics.Identity;

namespace Microsoft.AspNetCore.Builder
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseADUserMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ADUserMiddleware>();
        }
    }
}
