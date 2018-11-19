using System;
using System.Collections.Generic;
using System.Text;

namespace Logistics.Identity.Extensions
{
    public static class CoreExtensions
    {
        public static string GetExceptionChain(this Exception ex)
        {
            var message = new StringBuilder(ex.Message);

            if (ex.InnerException != null)
            {
                message.AppendLine();
                message.AppendLine(GetExceptionChain(ex.InnerException));
            }

            return message.ToString();
        }
    }
}
