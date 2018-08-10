using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class ItemCategoryExtensions
    {
        public static async Task<List<ItemGroupCategory>> GetItemGroupCategories(this AppDbContext db)
        {
            var model = await db.ItemGroupCategories
                .ToListAsync();

            return model;
        }

        public static async Task<List<ItemCategory>> GetItemCategories(this AppDbContext db, int itemGroupCategoryId)
        {
            var model = await db.ItemCategories
                .Where(x => !x.IsDeleted && x.ItemGroupCategoryId == itemGroupCategoryId)
                .ToListAsync();

            return model;
        }

        public static async Task<List<ItemCategory>> GetDeletedItemCategories(this AppDbContext db, int itemGroupCategoryId)
        {
            var model = await db.ItemCategories
                .Where(x => x.IsDeleted && x.ItemGroupCategoryId == itemGroupCategoryId)
                .ToListAsync();

            return model;
        }

        public static async Task<ItemCategory> GetItemCategory(this AppDbContext db, int id)
        {
            var model = await db.ItemCategories.FindAsync(id);
            return model;
        }

        public static async Task AddItemCategory(this AppDbContext db, ItemCategory itemCategory)
        {
            if (await itemCategory.Validate(db))
            {
                db.ItemCategories.Attach(itemCategory);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateItemCategory(this AppDbContext db, ItemCategory itemCategory)
        {
            if (await itemCategory.Validate(db))
            {
                var i = await db.ItemCategories.FindAsync(itemCategory.Id);
                i.Label = itemCategory.Label;
                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleItemCategoryDeleted(this AppDbContext db, int itemCategoryId)
        {
            var itemCategory = await db.ItemCategories.FindAsync(itemCategoryId);
            itemCategory.IsDeleted = !itemCategory.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeleteItemCategory(this AppDbContext db, int itemCategoryId)
        {
            if (await db.ItemCategoryEmpty(itemCategoryId))
            {
                var itemCategory = await db.ItemCategories.FindAsync(itemCategoryId);
                db.ItemCategories.Remove(itemCategory);
                await db.SaveChangesAsync();
            }
        }

        private static async Task<bool> ItemCategoryEmpty(this AppDbContext db, int itemCategoryId)
        {
            var ex = "Item Category has dependent records. Contact dev to delete.";

            dynamic check = await db.Items.FirstOrDefaultAsync(x => x.ItemCategoryId == itemCategoryId);
            if (check != null) throw new Exception(ex);

            check = await db.Manufacturers.FirstOrDefaultAsync(x => x.ItemCategoryId == itemCategoryId);
            if (check != null) throw new Exception(ex);

            return true;
        }

        private static async Task<bool> Validate(this ItemCategory model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Label))
            {
                throw new Exception("Item Category must have a label");
            }

            if (model.ItemGroupCategoryId < 1)
            {
                throw new Exception("Item Category must be linked to an Item Group Category");
            }

            var check = model.Id > 0 ?
                await db.ItemCategories.FirstOrDefaultAsync(x => x.Label.ToLower() == model.Label.ToLower() &&
                    x.ItemGroupCategoryId == model.ItemGroupCategoryId &&
                    x.Id != model.Id) :
                await db.ItemCategories.FirstOrDefaultAsync(x => x.Label.ToLower() == model.Label.ToLower() &&
                    x.ItemGroupCategoryId == model.ItemGroupCategoryId);

            if (check != null)
            {
                throw new Exception("The provided Item Category already exists");
            }

            return true;
        }
    }
}
