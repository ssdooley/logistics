﻿using System;
using System.Text;
using System.Text.RegularExpressions;

namespace Logistics.Data.Extensions
{
    public static class CoreExtensions
    {
        private static string urlPattern = "[^a-zA-Z0-9-.]";

        public static string UrlEncode(this string url)
        {
            var friendlyUrl = Regex.Replace(url, @"\s", "-").ToLower();
            friendlyUrl = Regex.Replace(friendlyUrl, urlPattern, string.Empty);
            return friendlyUrl;
        }

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
