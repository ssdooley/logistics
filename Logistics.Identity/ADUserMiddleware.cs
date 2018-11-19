using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Identity
{
    public class ADUserMiddleware
    {
        private readonly RequestDelegate next;

        public ADUserMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUserProvider userProvider)
        {
            if (!(userProvider.Initialized))
            {
                await userProvider.Create(httpContext);
            }

            await next(httpContext);
        }
    }
}
