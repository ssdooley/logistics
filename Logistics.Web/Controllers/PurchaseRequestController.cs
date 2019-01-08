using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    public class PurchaseRequestController : Controller
    {
        private AppDbContext db;

        public PurchaseRequestController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<Request>> GetPurchaseRequests() => await db.GetPurchaseRequests();
        [HttpGet("[action]/{id}")]
        public async Task<Request> GetPurchaseRequest([FromRoute]int id) => await db.GetPurchaseRequest(id);
        [HttpGet("[action]")]
        public async Task<List<Request>> GetPurchaseRequestsByUser([FromBody]User user) => await db.GetPurchaseRequestByUser(user);
        [HttpPost("[action]")]
        public async Task UpdatePurchaseRequest([FromBody]Request request) => await db.UpdateRequest(request);
        [HttpPost("[action]")]
        public async Task AddPurchaseRequest([FromBody]Request request) => await db.AddRequest(request);
        [HttpPost("[action]")]
        public async Task GetRequestItems() => await db.GetRequestItems();
        [HttpPost("[action]")]
        public async Task AddItems([FromBody]Request request, RequestItem item) => await db.AddItems(request, item);
        [HttpPost("[action]")]
        public async Task UpdateItems([FromBody]RequestItem item) => await db.UpdateItems(item);
        [HttpPost("[action]")]
        public async Task DeleteItem([FromBody]RequestItem item) => await db.DeleteItem(item);
    }
}
