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
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{   
    public class OfferController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IPhotoService _photoService;
        public OfferController(DataContext context, IWebHostEnvironment webHostEnvironment, IPhotoService photoService)
        {
            this._context = context;
            this._webHostEnvironment = webHostEnvironment;
            this._photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppOffer>>> GetOffers() //Get all offers
        {
            return await _context.Offers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppOffer>> GetOffer(int id)
        {
            return await _context.Offers.FindAsync(id); //Get offer by primary key.
        }


        [HttpPost("add-new-offer")]
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
                Created = DateTime.Now.ToString("dddd, dd MMMM yyyy")
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();
            return offer;
        }

        [HttpGet("get-photos")]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos() //Get all photos
        {
            return await _context.Photos.ToListAsync();
        }

        [HttpGet("get-photos/{id}")]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotosByAppOfferId(int id) //Get all photos for offer
        {
            var photos = await _context.Photos.ToListAsync(); //Get all photos
            List<Photo> foundedPhotos = new List<Photo>();
            foreach (Photo photo in photos)
            {
                if (photo.AppOfferId == id) //Find photos with specified offer id
                {
                    foundedPhotos.Add(photo);
                }
                
            }
            return foundedPhotos;
        }

        [HttpPost("upload-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file) //Upload photo
        {
            var result = await _photoService.AddPhotoAsync(file); //Upload photo to cloudinary

            if (result.Error != null) return BadRequest(result.Error.Message);
            
            var photo = new Photo
            {
                Path = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                AppOfferId = 1,
                IsMain = false
            };

            _context.Photos.Add(photo); //Add photo properties to database
            await _context.SaveChangesAsync();
            return photo;
        }

        [HttpPut("set-main-photo/{id}")]
        public async Task<ActionResult> SetMainPhoto(int id) //Set main photo for offer
        {
            var photo = _context.Photos.FirstOrDefault(x => x.Id == id); //Get photo which will be new main photo
            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = _context.Photos.FirstOrDefault(x => x.IsMain); //Get current main photo
            if (currentMain != null) currentMain.IsMain = false; //make current main photo a not main photo
            photo.IsMain = true; //make choosen photo a main photo

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-offer")]
        public async Task<ActionResult> UpdateOffer(OfferDto offerdto) { //Update offer
            var offer = await _context.Offers.FindAsync(offerdto.Id);

                offer.Category = offerdto.Category;
                offer.Brand = offerdto.Brand;
                offer.Model = offerdto.Model;
                offer.ModelYear = offerdto.ModelYear;
                offer.Kilometers = offerdto.Kilometers;
                offer.EngineSize = offerdto.EngineSize;
                offer.Horsepowers = offerdto.Horsepowers;
                offer.Fuel = offerdto.Fuel;
                offer.Gearbox = offerdto.Gearbox;
                offer.Color = offerdto.Color;
                offer.Price = offerdto.Price;
                offer.Post = offerdto.Post;
                offer.City = offerdto.City;
                offer.Description = offerdto.Description;

                _context.Offers.Update(offer);

                await _context.SaveChangesAsync();
                return NoContent();
        }
    }           
}