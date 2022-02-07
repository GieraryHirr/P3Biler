using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) //Passing registerDTO object and receivint UserDto where we have login and token.
        {
            if(await UserExists(registerDto.Login, registerDto.Email)) return BadRequest("Username or email is taken");
            

            using var hmac = new HMACSHA512(); //Password encryption

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
            return new UserDto
            {
                Login = user.login,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) //Passing LoginDto and receiving AppUser
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.login == loginDto.Login); //If not found, return null

            if (user == null) return Unauthorized("Invalid login");

            using var hmac = new HMACSHA512(user.passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++) //Check that password is correct
            {
                if(computedHash[i] != user.passwordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Login = user.login,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string login, string email)
        {
            return await _context.Users.AnyAsync(x => x.login == login.ToLower() || x.email == email.ToLower()); //If login or email exist in database, return true.
        }
    }
}