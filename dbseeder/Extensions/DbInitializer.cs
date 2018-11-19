using Logistics.Data;
using System.Collections.Generic;
using System.Linq;

namespace dbseeder.Extensions
{
    public static class DbInitializer
    {
        public static void Initialize(this AppDbContext db)
        {
            db.Database.EnsureCreated();

            if (!(db.ItemGroupCategories.Any()))
            {
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
        }
    }
}
