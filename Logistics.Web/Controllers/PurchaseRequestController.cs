using Logistics.Data;
using Logistics.Data.Extensions;
using Logistics.Web.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class PurchaseRequestController : Controller
    {
        private AppDbContext db;
        private UserManager manager; 

        public PurchaseRequestController(AppDbContext db, UserManager manager)
        {
            this.db = db;
            this.manager = manager;
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
        public async Task<int> AddPurchaseRequest([FromBody]Request model)
        {
            model.User = manager.CurrentUser;
            var id = await db.AddRequest(model);
            var request = await db.GetPurchaseRequest(id);
            return id;
        }
        [HttpPost("[action]/{id}")]
        public async Task GetRequestItems([FromRoute]int id) => await db.GetRequestItems(id);

        [HttpPost("[action]/{id}")]
        public async Task GetRequestItem([FromRoute]int id) => await db.GetRequestItem(id);

        [HttpPost("[action]")]
        public async Task AddItems([FromBody]RequestItem requestItem, int requestId) => await db.AddItems(requestItem, requestId);

        [HttpPost("[action]")]
        public async Task UpdateItems([FromBody]RequestItem item) => await db.UpdateItems(item);

        [HttpPost("[action]")]
        public async Task DeleteItem([FromBody]RequestItem item) => await db.DeleteItem(item);
    }
}
