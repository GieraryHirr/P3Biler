using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            this._context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Login, registerDto.Email)) return BadRequest("Username or email is taken");
            

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                login = registerDto.Login,
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                passwordSalt = hmac.Key,
                email = registerDto.Email,
                tlfnr = registerDto.Tlfnr,
                fornavn = registerDto.Fornavn,
                efternavn = registerDto.Efternavn
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> UserExists(string login, string email)
        {
            return await _context.Users.AnyAsync(x => x.login == login.ToLower() || x.email == email.ToLower());
        }
    }
}