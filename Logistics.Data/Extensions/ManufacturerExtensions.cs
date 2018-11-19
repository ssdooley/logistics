using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Data.Extensions
{
    public static class ManufacturerExtensions
    {
        public static async Task<List<Manufacturer>> GetManufacturers(this AppDbContext db)
        {
            var model = await db.Manufacturers
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<Manufacturer>> GetDeletedManufacturers(this AppDbContext db)
        {
            var model = await db.Manufacturers
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<Manufacturer> GetManufacturer(this AppDbContext db, int id)
        {
            var model = await db.Manufacturers.FindAsync(id);
            return model;
        }

        public static async Task AddManufacturer(this AppDbContext db, Manufacturer manufacturer)
        {
            if (await manufacturer.Validate(db))
            {
                manufacturer.ClearNavProps();
                await db.Manufacturers.AddAsync(manufacturer);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateManufacturer(this AppDbContext db, Manufacturer manufacturer)
        {
            if (await manufacturer.Validate(db))
            {
                var m = await db.Manufacturers.FindAsync(manufacturer.Id);
                m.Name = manufacturer.Name;
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleManufacturerDeleted(this AppDbContext db, int manufacturerId)
        {
            var manufacturer = await db.Manufacturers.FindAsync(manufacturerId);
            manufacturer.IsDeleted = !manufacturer.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeleteManufacturer(this AppDbContext db, int manufacturerId)
        {
            if (await db.ManufacturerEmpty(manufacturerId))
            {
                var manufacturer = await db.Manufacturers.FindAsync(manufacturerId);
                db.Manufacturers.Remove(manufacturer);
                await db.SaveChangesAsync();
            }
        }

        private static async Task<bool> ManufacturerEmpty(this AppDbContext db, int manufacturerId)
        {
            var ex = "Manufacturer has dependent records. Contact dev to delete.";

            dynamic check = await db.Items.FirstOrDefaultAsync(x => x.ManufacturerId == manufacturerId);
            if (check != null) throw new Exception(ex);

            return true;
        }

        private static async Task<bool> Validate(this Manufacturer model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Manufacturer must have a name");
            }

            if (model.ItemCategoryId < 1)
            {
                throw new Exception("Manufacturer must be linked to an Item Category");
            }

            var check = model.Id > 0 ?
                await db.Manufacturers.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower() &&
                    x.ItemCategoryId == model.ItemCategoryId &&
                    x.Id != model.Id) :
                await db.Manufacturers.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower() &&
                    x.ItemCategoryId == model.ItemCategoryId);

            if (check != null)
            {
                throw new Exception("The provided Manufacturer already exists");
            }

            return true;
        }

        private static void ClearNavProps(this Manufacturer manufacturer)
        {
            manufacturer.ItemCategory = null;
        }
    }
}
