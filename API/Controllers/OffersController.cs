using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OffersController : BaseApiController
    {
        private readonly DataContext _context;
        public OffersController(DataContext context)
        {
            this._context = context;
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
    }
}