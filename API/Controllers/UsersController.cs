using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() //API to get all users
        {
            List<SellerDto> sellers = new List<SellerDto>();
            var users = await _context.Users.ToListAsync();
            foreach (var item in users)
            {
                var seller = new SellerDto
                {
                    Id = item.Id,
                    email = item.email,
                    fornavn = item.fornavn,
                    efternavn = item.efternavn,
                    LastActive = item.LastActive
                };
                sellers.Add(seller);
            }

            return Ok(sellers); //Return list of SellerDto objects.
        }

        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id) //API to get selected user
        {
            return await _context.Users.FindAsync(id); //Find() checking all primary keys in table.
        }
    }
}