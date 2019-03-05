using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Logistics.Data;
using Microsoft.AspNetCore.Mvc;
using Logistics.Data.Extensions;
using OfficeOpenXml;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class ExportController : Controller
    {
        private AppDbContext db;

        public ExportController(AppDbContext db)
        {
            this.db = db;           
        }
        [HttpGet("[action]")]
        public async Task ExportRequests()
        {
            var requests = await db.Requests
                .Include(x => x.ItemGroups)
                .Include(x => x.RequestAttachments)
                .Include(x => x.RequestItems)
                .ToListAsync();            

            int numRows = requests.Count();

            if (numRows <= 0)
            {

            }

            ExcelPackage excel = new ExcelPackage();

            var workSheet = excel.Workbook.Worksheets.Add("requests");
            //workSheet.Column(1).Style.Numberformat.Format = "yyyy-mm-dd";
            workSheet.Cells[3, 1].LoadFromCollection(requests, true);
            workSheet.Cells.AutoFitColumns();
            workSheet.Column(2).Width = 50;

            //Note: if our method was set to return a FileContentResult or IActionResult, we could do this:

            //Byte[] theData = excel.GetAsByteArray();
            //string filename = "requests.xlsx";
            //string mimeType = "application/vnd.openxmlformats-officedocument.spreadsheet";
            //return File(theData, mimeType, filename);

            using (var memoryStream = new MemoryStream())
            {
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers["content-disposition"] = "attachment; filename=Requets.xlsx";
                excel.SaveAs(memoryStream);
                memoryStream.WriteTo(Response.Body);
            }

            excel.Save();
        }
    }
}