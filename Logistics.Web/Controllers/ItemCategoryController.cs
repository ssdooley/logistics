using Logistics.Data;
using Logistics.Data.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class ItemCategoryController : Controller
    {
        private AppDbContext db;

        public ItemCategoryController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<List<ItemGroupCategory>> GetItemGroupCategories() => await db.GetItemGroupCategories();

        [HttpGet("[action]/{id}")]
        public async Task<List<ItemCategory>> GetItemCategories([FromRoute]int id) => await db.GetItemCategories(id);

        [HttpGet("[action]/{id}")]
        public async Task<List<ItemCategory>> GetDeletedItemCategories([FromRoute]int id) => await db.GetDeletedItemCategories(id);

        [HttpGet("[action]/{id}")]
        public async Task<ItemCategory> GetItemCategory([FromRoute]int id) => await db.GetItemCategory(id);

        [HttpPost("[action]")]
        public async Task AddItemCategory([FromBody]ItemCategory itemCategory) => await db.AddItemCategory(itemCategory);

        [HttpPost("[action]")]
        public async Task UpdateItemCategory([FromBody]ItemCategory itemCategory) => await db.UpdateItemCategory(itemCategory);

        [HttpPost("[action]")]
        public async Task ToggleItemCategoryDeleted([FromBody]int id) => await db.ToggleItemCategoryDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteItemCategory([FromBody]int id) => await db.DeleteItemCategory(id);
    }
}
