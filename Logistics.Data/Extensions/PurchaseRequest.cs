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
                r.Mission = request.Mission;
                r.LastModified = request.LastModified;
                r.Priority = request.Priority;
                r.RenewalDate = request.RenewalDate;
                r.RequestAttachments = request.RequestAttachments;
                r.Requirement = request.Requirement;
                r.Site = request.Site;
                r.Subject = request.Subject;
                r.User = request.User;
                await db.SaveChangesAsync();
            }
        }

        public static async Task<int> AddRequest(this AppDbContext db, Request request)
        {
            if (await request.Validate(db))
            {
                request.DateSubmitted = DateTime.Now;
                request.LastModified = DateTime.Now;
                request.PriorityId = request.Priority.Id;
                request.SiteId = request.Site.Id;
                db.Priorities.Attach(request.Priority);
                db.Sites.Attach(request.Site);


                await db.Requests.AddAsync(request);
                await db.SaveChangesAsync();                              

                foreach (var item in request.RequestItems)
                {
                    await db.AddItems(item, request.Id);
                }

                return request.Id;
            }

            throw new Exception("Invalid request");
        }

        public static async Task<List<RequestItem>> GetRequestItems(this AppDbContext db, int id)
        {
            var model = await db.RequestItems
                .Where(x => x.RequestId == id)
                .ToListAsync();

            return model;

        }

        public static async Task<RequestItem> GetRequestItem(this AppDbContext db, int id)
        {
            var model = await db.RequestItems.FindAsync(id);

            return model;

        }

        public static async Task AddItems(this AppDbContext db, RequestItem requestItem, int requestId = 0)
        {
            requestItem.RequestId = requestId > 0 ? requestId : requestItem.Request.Id;
            db.RequestItems.Attach(requestItem);
            await db.SaveChangesAsync();            
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

            if (model.Priority == null)
            {
                throw new Exception("Priority must be selected");
            }

            if (model.Site == null)
            {
                throw new Exception("Please select a Site");
            }

            if (string.IsNullOrEmpty(model.Mission))
            {
                throw new Exception("Please select a Mission");
            }

            if (string.IsNullOrEmpty(model.Requirement))
            {
                throw new Exception("Please provide information for your Requirements");
            }

            if (string.IsNullOrEmpty(model.Justifications))
            {
                throw new Exception("Justifications are Required");
            }                                  

            var check = model.Id > 0 ?
                await db.Requests.FirstOrDefaultAsync(x => x.Subject.ToLower() == model.Subject.ToLower() && x.Id == model.Id) :
                await db.Requests.FirstOrDefaultAsync(x => x.Subject.ToLower() == model.Subject.ToLower() && x.UserId == model.UserId);

            if (check != null)
            {
                throw new Exception("The provided Request already exists");
            }

            return true;
        }
    }
}
