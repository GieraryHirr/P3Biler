using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class OfferController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public OfferController(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            this._context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("addnewoffer")]
        public async Task<ActionResult<AppOffer>> AddNewOffer(OfferDto offerDto) //Adding new offer do database
        {
            var offer = new AppOffer
            {
                Category = offerDto.Category,
                Brand = offerDto.Brand,
                Model = offerDto.Model,
                ModelYear = offerDto.ModelYear,
                Kilometers = offerDto.Kilometers,
                EngineSize = offerDto.EngineSize,
                Horsepowers = offerDto.Horsepowers,
                Fuel = offerDto.Fuel,
                Gearbox = offerDto.Gearbox,
                Color = offerDto.Color,
                Price = offerDto.Price,
                Post = offerDto.Post,
                City = offerDto.City,
                Description = offerDto.Description,
                AppUserId = offerDto.AppUserId,
                Created = DateTime.Now
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();
            return offer;
        }

        [HttpPost("uploadphoto")]
        public async Task<IActionResult> UploadPhoto(IFormFile obj)
        {

            Console.WriteLine("HERE I AM");
            if (string.IsNullOrWhiteSpace(_webHostEnvironment.WebRootPath))
            {
                _webHostEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            };

            string folder = "C:/images/";
            folder += Guid.NewGuid().ToString() + "_" + obj.FileName;
            string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await obj.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
            return Ok();

        }
        [HttpPost("uploadphoto2")]
        public async Task<IActionResult> UploadPhoto2([FromForm]IFormFile obj)
        {
            if (string.IsNullOrWhiteSpace(_webHostEnvironment.WebRootPath))
            {
                _webHostEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            };
                        string folder = "C:/images/";
            folder += Guid.NewGuid().ToString() + "_" + obj.FileName;
            string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
            await obj.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
            return Ok();
        }
        
        
    }           
}