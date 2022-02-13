using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OfferController : BaseApiController
    {
        private readonly DataContext _context;
        public OfferController(DataContext context)
        {
            this._context = context;
        }

        [HttpPost("addnewoffer")]
        public async Task<ActionResult<AppOffer>> AddNewOffer(OfferDto offerDto)
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
    }
}