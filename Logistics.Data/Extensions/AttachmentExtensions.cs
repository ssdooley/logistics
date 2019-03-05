using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Logistics.Data.Extensions
{
    public static class AttachmentExtensions
    {
        // root directory for file uploads
        private static string uploadBase = @"C:\\Apps\Demo";

        // pattern for detecting the drive path from the file url
        private static string drivePathPattern = @"^[a-zA-A]:";

        // Save the file and create a database record
        private static async Task AddOrderAttachment(this AppDbContext db, IFormFile file, User user, int orderId)
        {
            var uploadUrl = $@"{uploadBase}{user.Guid.ToString()}\";
            var upload = await file.WriteFile(uploadUrl);

            var attachment = new OrderAttachment
            {
                Name = upload.Name,
                File = upload.File,
                Url = upload.Url,
                Path = upload.Path,
                OrderId = orderId,
                DateUploaded = DateTime.Now,
                UserId = user.Id,
                IsDeleted = false

            };

            await db.Attachments.AddAsync(attachment);
            await db.SaveChangesAsync();
        }

        private static async Task AddRequestAttachment(this AppDbContext db, IFormFile file, User user, int requestId)
        {
            var uploadUrl = $@"{uploadBase}{user.Guid.ToString()}\";
            var upload = await file.WriteFile(uploadUrl);

            var attachment = new RequestAttachment
            {
                Name = upload.Name,
                File = upload.File,
                Url = upload.Url,
                Path = upload.Path,
                RequestId = requestId,
                DateUploaded = DateTime.Now,
                UserId = user.Id,
                IsDeleted = false

            };
            
            await db.Attachments.AddAsync(attachment);
            await db.SaveChangesAsync();
        }

        // Write the file to storage
        private static async Task<UploadModel> WriteFile(this IFormFile file, string uploadUrl)
        {
            if (!Directory.Exists(uploadUrl))
            {
                Directory.CreateDirectory(uploadUrl);
            }

            var upload = await file.CreateUploadModel(uploadUrl);

            using (var stream = new FileStream(upload.Path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return upload;
        }

        // Translate IFormFile into UploadModel
        private static Task<UploadModel> CreateUploadModel(this IFormFile file, string uploadUrl)
        {
            return Task.Run(() =>
            {
                var name = file.CreateSafeName(uploadUrl);
                var model = new UploadModel
                {
                    Name = name,
                    File = file.Name,
                    Path = $"{uploadUrl}{name}",
                    Url = ($"{uploadUrl}{name}").CheckUrlPath()
                };
                return model;
            });
        }

        // create file:/// url from file path url
        private static string CheckUrlPath(this string url)
        {
            if (Regex.Match(url, drivePathPattern).Success)
            {
                var newPath = $@"Fille:///{url}";
                return Regex.Replace(newPath, @"\\", "/");
            }
            return url;
        }

        /*
            If a file of the current file name already exists in
            the directory, create a unique name to prevent the 
            previous file from being overwritten
        */
        private static string CreateSafeName(this IFormFile file, string uploadUrl)
        {
            var increment = 0;
            var fileName = file.FileName.UrlEncode();
            var newName = file.FileName.UrlEncode();

            while (File.Exists(uploadUrl + newName))
            {
                increment++;
                var extension = fileName.Split('.').Last();
                newName = $"{fileName.Replace($".{extension}", string.Empty)}_{increment}.{extension}";
            }

            return newName;
        }

        // Physically delete file from storage
        private static Task DeleteFile(this Attachment attachment)
        {
            return Task.Run(() =>
            {
                try
                {
                    if (File.Exists(attachment.Path))
                    {
                        File.Delete(attachment.Path);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.GetExceptionChain());
                }
            });
        }

        // Include data for the user who uploaded the attachment
        private static IQueryable<Attachment> SetIncludes(this DbSet<Attachment> attachments)
        {
            return attachments.Include(x => x.User);
        }

        // Get non-deleted attachments
        public static async Task<List<Attachment>> GetAttachments(this AppDbContext db)
        {
            var attachments = await db.Attachments
                .SetIncludes()
                .Where(x => !x.IsDeleted)
                .OrderBy(x => x.File)
                .ToListAsync();

            return attachments;
        }
        
        // Get deleted attachments
        public static async Task<List<Attachment>> GetDeletedAttachments(this AppDbContext db)
        {
            var attachments = await db.Attachments
                .SetIncludes()
                .Where(x => x.IsDeleted)
                .OrderBy(x => x.File)
                .ToListAsync();

            return attachments;
        }

        // upload a collection of files and sve them to the database
        public static async Task UploadOrderAttachments(this AppDbContext db, IFormFileCollection files, User user, int orderId)
        {
            foreach (var file in files)
            {
                await db.AddOrderAttachment(file, user, orderId);
            }
        }

        public static async Task UploadRequestAttachments(this AppDbContext db, IFormFileCollection files, User user, int requestId)
        {
            foreach (var file in files)
            {
                await db.AddRequestAttachment(file, user, requestId);
            }
        }

        // toggle the deleted flag for an attachment record
        public static async Task ToggleAttachmentDeleted(this AppDbContext db, int id)
        {
            var attachment = await db.Attachments.FindAsync(id);
            attachment.IsDeleted = !attachment.IsDeleted;
            await db.SaveChangesAsync();
        }

        // Permanently dete the file and its database record
        public static async Task DeleteAttachment(this AppDbContext db, Attachment model)
        {
            await model.DeleteFile();
            var attachment = await db.Attachments.FindAsync(model.Id);
            db.Attachments.Remove(attachment);
            await db.SaveChangesAsync();
        }
    }
}
