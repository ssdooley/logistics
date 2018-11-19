using dbseeder.Extensions;
using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace dbseeder
{
    class Program
    {
        static void Main(string[] args)
        {
            var arg = args.FirstOrDefault();
            var connection = string.Empty;

            while (string.IsNullOrEmpty(arg))
            {
                Console.WriteLine("Arguments must be provided to seed the database. Your options are as follows:");
                Console.WriteLine("[environmentVariable] - An environment variable that points to a connection string");
                Console.WriteLine("-c [connectionString] - Option -c with the connection string directly specified");
                arg = Console.ReadLine();
                Console.WriteLine();
            }

            if (arg.ToLower().Contains("-c"))
            {
                connection = args.Skip(1).FirstOrDefault();

                while (string.IsNullOrEmpty(connection))
                {
                    Console.WriteLine("Please provide a SQL connection string:");
                    connection = Console.ReadLine();
                    Console.WriteLine();
                }
            }
            else
            {
                while (string.IsNullOrEmpty(Environment.GetEnvironmentVariable(arg)))
                {
                    Console.WriteLine("Please provide an environment variable that points to a connection string:");
                    arg = Console.ReadLine();
                    Console.WriteLine();
                }

                connection = Environment.GetEnvironmentVariable(arg);
            }

            try
            {
                var builder = new DbContextOptionsBuilder<AppDbContext>()
                    .UseSqlServer(connection);

                using (var db = new AppDbContext(builder.Options))
                {
                    db.Initialize();
                }

                Console.WriteLine();
                Console.WriteLine("Database seeding completed successfully!");
                Console.WriteLine();
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while seeding the databse:");
                Console.WriteLine(ex.GetExceptionChain());
                Console.WriteLine();
            }

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
