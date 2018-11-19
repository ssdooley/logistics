using Identity.Mock;

namespace Microsoft.AspNetCore.Builder
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseMockMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MockMiddleware>();
        }
    }
}
