using Logistics.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Mock
{
    public class MockMiddleware
    {
        private readonly RequestDelegate next;

        public MockMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUserProvider userProvider, IConfiguration configuration)
        {
            if (!(userProvider.Initialized))
            {
                await userProvider.Create(configuration.GetValue<string>("CurrentUser"));
            }

            await next(httpContext);
        }
    }
}
