using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logistics.Data.Extensions
{
    public static class PurchaseRequest
    {
        public static async Task<List<Request>> GetPurchaseRequests(this AppDbContext db)
        {
            var model = await db.Requests
                .Include(x => x.ItemGroups)
                .Include(x => x.RequestAttachments)
                .Include(x => x.RequestItems)
                .ToListAsync();

            return model;

        }

        public static async Task<Request> GetPurchaseRequest(this AppDbContext db, int id)
        {
            var model = await db.Requests.FindAsync(id);

            return model;
        }

        public static async Task<List<Request>> GetPurchaseRequestByUser(this AppDbContext db, User user)
        {
            var model = await db.Requests
                .Where(x => x.User.Id == user.Id)
                .Include(x => x.ItemGroups)
                .Include(x => x.RequestAttachments)
                .Include(x => x.RequestItems)
                .ToListAsync();

            return model;
        }

        public static async Task UpdateRequest(this AppDbContext db, Request request)
        {
            if (await request.Validate(db))
            {
                var r = await db.Requests.FindAsync(request.Id);
                r.IsApproved = request.IsApproved;
                r.IsComplete = request.IsComplete;
                r.IsRecurring = request.IsRecurring;
                r.ItemGroups = request.ItemGroups;
                r.Justifications = request.Justifications;
                r.LastModified = request.LastModified;
                r.Priority = request.Priority;
                r.RenewalDate = request.RenewalDate;
                r.RequestAttachments = request.RequestAttachments;
                r.RequestItems = request.RequestItems;
                r.Requirement = request.Requirement;
                r.Site = request.Site;
                r.Subject = request.Subject;
                r.User = request.User;
                await db.SaveChangesAsync();
            }
        }

        public static async Task AddRequest(this AppDbContext db, Request request)
        {
            if (await request.Validate(db))
            {
                await db.Requests.AddAsync(request);
                await db.SaveChangesAsync();
            }
        }

        public static async Task<List<RequestItem>> GetRequestItems(this AppDbContext db)
        {
            var model = await db.RequestItems
                .ToListAsync();

            return model;

        }

        public static async Task AddItems(this AppDbContext db, Request request, RequestItem requestItem)
        {
            if (await request.Validate(db))
            {
                requestItem.RequestId = request.Id;
                await db.RequestItems.AddAsync(requestItem);
                await db.SaveChangesAsync();
            }
        }

        public static async Task UpdateItems(this AppDbContext db, RequestItem item)
        {
            var i = await db.RequestItems.FindAsync(item.Id);
            i.Name = item.Name;
            i.Quantity = item.Quantity;
            i.Cost = item.Cost;
            await db.SaveChangesAsync();

        }

        public static async Task DeleteItem(this AppDbContext db, RequestItem item)
        {
            var itemToDelete = await db.RequestItems.FindAsync(item.Id);
            if (itemToDelete.Request.DateSubmitted.Date < DateTime.Now.Date)
            {
                throw new Exception("Item is associated with a Purchase Request and cannot be deleted");
            }
            db.RequestItems.Remove(itemToDelete);
            await db.SaveChangesAsync();
        }

        private static async Task<bool> Validate(this Request model, AppDbContext db)
        {
            if (string.IsNullOrEmpty(model.Subject))
            {
                throw new Exception("Subject must be filled in");
            }

            var check = model.Id > 0 ?
                await db.Requests.FirstOrDefaultAsync(x => x.Subject.ToLower() == model.Subject.ToLower() && x.Id == model.Id) :
                await db.Requests.FirstOrDefaultAsync(x => x.Subject.ToLower() == model.Subject.ToLower() && x.RequestItems == model.RequestItems);

            if (check != null)
            {
                throw new Exception("The provided Request already exists");
            }

            return true;
        }
    }
}
