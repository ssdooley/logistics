using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace dbseeder.Extensions
{
    public static class DbInitializer
    {
        public static void Initialize(this AppDbContext db)
        {
            Console.WriteLine("Initializing database");

            db.Database.Migrate();

            if (!(db.ItemGroupCategories.Any()))
            {
                Console.WriteLine("Seeding item categories");

                var categories = new List<ItemGroupCategory>()
                {
                    new ItemGroupCategory { Label = "Serialized" },
                    new ItemGroupCategory { Label = "Non-Serialized" },
                    new ItemGroupCategory { Label = "Hardware" },
                    new ItemGroupCategory { Label = "Software" },
                    new ItemGroupCategory { Label = "Contracts" }
                };

                db.ItemGroupCategories.AddRange(categories);
                db.SaveChanges();
            }

            Console.WriteLine("Finished seeding database...");
        }
    }
}
