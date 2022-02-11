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
                Color = offerDto.Color,
                Created = DateTime.Now,
                Price = offerDto.Price,
                Category = offerDto.Category,
                Kilometers = offerDto.Kilometers,
                ModelYear = offerDto.ModelYear,
                EngineSize = offerDto.EngineSize,
                Horsepowers = offerDto.Horsepowers,
                Post = offerDto.Post,
                City = offerDto.City,
                Model = offerDto.Model,
                Brand = offerDto.Brand,
                Fuel = offerDto.Fuel,
                Gearbox = offerDto.Gearbox,
                Description = offerDto.Description,
                //AppUserId = GET DATA FROM LOCALSTORAGE 
            };

            return offer;
        }
    }
}