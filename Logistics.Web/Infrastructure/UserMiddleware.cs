using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Infrastructure
{
    public class UserMiddleware
    {
        private readonly RequestDelegate next;

        public UserMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext, UserManager userManager)
        {
            if (!userManager.Initialized)
            {
                await userManager.Create(httpContext);
            }

            await next(httpContext);
        }
    }
}
