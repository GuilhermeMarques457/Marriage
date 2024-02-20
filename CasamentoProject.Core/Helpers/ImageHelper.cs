using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasamentoProject.Core.Helpers
{
    public static class ImageHelper
    {
        public async static Task<string> AddImage(IFormFile filePath, string projectFolder, string wwwrootFolder, Guid? id)
        {
            var fileName = Path.Combine($"{id}-{filePath.FileName}").Replace("\\", "/");
            var fileFullPath = Path.Combine(projectFolder, wwwrootFolder, fileName).Replace("\\", "/");

            using (var stream = new FileStream(fileFullPath, FileMode.Create))
            {
                await filePath.CopyToAsync(stream);
            }

            return Path.Combine(wwwrootFolder, fileName);
        }

        public static Task<bool> DeleteImage(string? filePath, string? projectFolder)
        {
            if (filePath == null || projectFolder == null)
                return Task.FromResult(false);

            var fileFullPath = Path.Combine(projectFolder, filePath.Replace("~/", ""));

            if (File.Exists(fileFullPath))
            {
                File.Delete(fileFullPath);
                return Task.FromResult(true);
            }
            else
            {
                return Task.FromResult(false);
            }
        }

        public static IFormFile GetImage(string path)
        {
            using (var stream = File.OpenRead(path))
            {
                return new FormFile(stream, 0, stream.Length, "imagem-casal", Path.GetFileName(stream.Name));
            }
        }
    }
}
