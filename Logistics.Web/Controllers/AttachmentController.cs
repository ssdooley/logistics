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
    public class AttachmentController : Controller
    {
        private AppDbContext db;
        private UserManager manager;
        
        public AttachmentController(AppDbContext db, UserManager manager)
        {
            this.db = db;
            this.manager = manager;
        }

        [HttpGet("[action]")]
        public async Task<List<Attachment>> GetAttachments() => await db.GetAttachments();

        [HttpGet("[action]")]
        public async Task<List<Attachment>> GetDeletedAttachments() => await db.GetDeletedAttachments();

        [HttpPost("[action]")]
        public async Task UploadOrderAttachments([FromRoute]int orderId)
        {
            var files = Request.Form.Files;

            if (files.Count < 1)
            {
                throw new Exception("No files provided for upload");
            }

            await db.UploadOrderAttachments(files, manager.CurrentUser, orderId);
        }

        [HttpPost("[action]/{id}")]
        public async Task UploadRequestAttachments([FromRoute]int id)
        {
            var files = Request.Form.Files;

            if (files.Count < 1)
            {
                throw new Exception("No files provided for upload");
            }

            await db.UploadRequestAttachments(files, manager.CurrentUser, id);
        }

        [HttpPost("[action]")]
        public async Task ToggleAttachmentDeleted([FromBody]int id) => await db.ToggleAttachmentDeleted(id);

        [HttpPost("[action]")]
        public async Task DeleteAttachment([FromBody]Attachment attachment) => await db.DeleteAttachment(attachment);

    }
}
