using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace dbseeder.Extensions
{
    public static class CoreExtensions
    {
        public static string GetTextFromEmbeddedResource(this string resourceName)
        {
            string text = string.Empty;

            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    text = reader.ReadToEnd();
                }
            }

            return text;
        }

        public static string GetExceptionChain(this Exception ex)
        {
            var message = new StringBuilder(ex.Message);

            if (ex.InnerException != null)
            {
                message.AppendLine(GetExceptionChain(ex.InnerException));
            }

            return message.ToString();
        }
    }
}
