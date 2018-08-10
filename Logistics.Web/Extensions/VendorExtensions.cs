using Logistics.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Extensions
{
    public static class VendorExtensions
    {
        public static async Task<List<Vendor>> GetVendors(this AppDbContext db)
        {
            var model = await db.Vendors
                .Where(x => !x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<List<Vendor>> GetDeletedVendors(this AppDbContext db)
        {
            var model = await db.Vendors
                .Where(x => x.IsDeleted)
                .ToListAsync();

            return model;
        }

        public static async Task<Vendor> GetVendor(this AppDbContext db, int id)
        {
            var model = await db.Vendors.FindAsync(id);
            return model;            
        }

        public static async Task AddVendor(this AppDbContext db, Vendor vendor)
        {
            if (await vendor.Validate(db))
            {
                await db.Vendors.AddAsync(vendor);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateVendor(this AppDbContext db, Vendor vendor)
        {
            if (await vendor.Validate(db))
            {
                var v = await db.Vendors.FindAsync(vendor.Id);

                v.Contact = vendor.Contact;
                v.Email = vendor.Email;
                v.Name = vendor.Name;
                v.Phone = vendor.Phone;
                v.Website = vendor.Website;

                await db.SaveChangesAsync();
            }
        }

        public static async Task ToggleVendorDeleted(this AppDbContext db, int vendorId)
        {
            var vendor = await db.Vendors.FindAsync(vendorId);
            vendor.IsDeleted = !vendor.IsDeleted;
            await db.SaveChangesAsync();
        }

        public static async Task DeleteVendor(this AppDbContext db, int vendorId)
        {
            if (await db.VendorEmpty(vendorId))
            {
                var vendor = await db.Vendors.FindAsync(vendorId);
                db.Vendors.Remove(vendor);
                await db.SaveChangesAsync();
            }
        }

        private static async Task<bool> VendorEmpty(this AppDbContext db, int vendorId)
        {
            var ex = "Vendor has dependent records. Contact dev to delete.";

            dynamic check = await db.Orders.FirstOrDefaultAsync(x => x.VendorId == vendorId);
            if (check != null) throw new Exception(ex);

            return true;
        }

        private static async Task<bool> Validate(this Vendor model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Email) && string.IsNullOrEmpty(model.Phone) && string.IsNullOrEmpty(model.Website))
            {
                throw new Exception("Vendor must have one of the following: Email Address, Phone Number, or Website");
            }

            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Vendor must have a name");
            }

            var check = model.Id > 0 ?
                await db.Vendors.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower() && x.Id == model.Id) :
                await db.Vendors.FirstOrDefaultAsync(x => x.Name.ToLower() == model.Name.ToLower());

            if (check != null)
            {
                throw new Exception("The provided Vendor already exists");
            }

            return true;
        }
    }
}
