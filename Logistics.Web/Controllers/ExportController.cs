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
using System.Threading;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Data;
using Logistics.Web.Extensions;

namespace Logistics.Web.Controllers
{
    [Route("api/[controller]")]
    public class ExportController : Controller
    {

        
        private AppDbContext db;
        private const string XlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        

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

            Byte[] bin = excel.GetAsByteArray();
            Response.Headers.Clear();
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.Headers["content-length"] = bin.Length.ToString();
            Response.Headers["content-disposition"] = "attachment; filename=Requets.xlsx";                       
        }

        [HttpGet("exportv2")]
        public async Task<IActionResult> ExportV2(CancellationToken cancellationToken)
        {
            // query data from database
            await Task.Yield();

            //var requests = await db.Requests
            //    .Include(x => x.ItemGroups)
            //    .Include(x => x.RequestAttachments)
            //    .Include(x => x.RequestItems)
            //    .ToListAsync();

            var requests = await db.GetPurchaseRequests();

            int numRows = requests.Count();

            if (numRows <= 0)
            {

            }


            var stream = new MemoryStream();

            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Sheet1");

                // simple way
                workSheet.Cells.LoadFromCollection(requests, true);

                //// mutual
                //workSheet.Row(1).Height = 20;
                //workSheet.Row(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                //workSheet.Row(1).Style.Font.Bold = true;
                //workSheet.Cells[1, 1].Value = "No";
                //workSheet.Cells[1, 2].Value = "Name";
                //workSheet.Cells[1, 3].Value = "Age";

                workSheet.Cells[3, 1].LoadFromCollection(requests, true);
                workSheet.Cells.AutoFitColumns();
                workSheet.Column(2).Width = 50;

                package.Save();
            }
            stream.Position = 0;
            string excelName = $"Requests-{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";

            //return File(stream, "application/octet-stream", excelName);
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }

        //[HttpPost("[action]")]
        //public async Task<IActionResult> UploadExcel([FromRoute] CancellationToken cancellationToken)
        //{
        //    var file = Request.Form.Files[0];
        //    if (file.Length < 1)
        //    {
        //        throw new Exception("No files provided for upload");
        //    }

        //    using (var memoryStream = new MemoryStream())
        //    {
        //        await file.CopyToAsync(memoryStream).ConfigureAwait(false);

        //        using (var package = new ExcelPackage(memoryStream))
        //        {
        //            var worksheet = package.Workbook.Worksheets[0]; // Tip: To access the first worksheet, try index 1, not 0
        //            return Content(readExcelPackageToString(package, worksheet));
                    
        //        }
        //    }
        //}

        [HttpPost("[action]")]
        public async Task<List<ExcelModel>> UploadExcel2([FromRoute] CancellationToken cancellationToken)
        {
            var file = Request.Form.Files[0];
            List<ExcelModel> excelList = new List<ExcelModel>();
            if (file.Length < 1)
            {
                throw new Exception("No files provided for upload");
            }
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream).ConfigureAwait(false);

                    using (var package = new ExcelPackage(memoryStream))
                    {
                        var worksheet = package.Workbook.Worksheets.FirstOrDefault();

                        excelList = worksheet.ImportExcelToList<ExcelModel>();                       
                    }

                }
            }
            catch (Exception err)
            {
                throw new Exception("You have encountered this error: " + err);
            }
            return excelList;
        }



        private string readExcelPackage(FileInfo fileInfo, string worksheetName)
        {
            using (var package = new ExcelPackage(fileInfo))
            {
                return readExcelPackageToString(package, package.Workbook.Worksheets[worksheetName]);
            }
        }

        private string readExcelPackageToString(ExcelPackage package, ExcelWorksheet worksheet)
        {
            var rowCount = worksheet.Dimension?.Rows;
            var colCount = worksheet.Dimension?.Columns;

            if (!rowCount.HasValue || !colCount.HasValue)
            {
                return string.Empty;
            }

            var sb = new StringBuilder();
            for (int row = 1; row <= rowCount.Value; row++)
            {
                for (int col = 1; col <= colCount.Value; col++)
                {
                    sb.AppendFormat("{0}\t", worksheet.Cells[row, col].Value);
                }
                sb.Append(Environment.NewLine);
            }
            return sb.ToString();
        }

        public class ExcelModel
        {
            public string Id { get; set; }
            public string Justifications { get; set; }
            public string Subject { get; set; }
            public string Requirement { get; set; }
            public string Mission { get; set; }
            public string DateSubmitted { get; set; }
            public string LastModified { get; set; }
        }

        

        
    }
}