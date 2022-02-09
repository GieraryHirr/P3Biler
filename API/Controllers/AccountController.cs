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
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) //API to add user to database
        {
            if(await UserExists(registerDto.Login, registerDto.Email)) return BadRequest("Username or email is taken"); //if user exist return bad request
            

            using var hmac = new HMACSHA512(); //Password encryption

            var user = new AppUser //Mapping DTO to new AppUser
            {
                login = registerDto.Login,
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                passwordSalt = hmac.Key,
                email = registerDto.Email,
                tlfnr = registerDto.Tlfnr,
                fornavn = registerDto.Fornavn,
                efternavn = registerDto.Efternavn
            };

            _context.Users.Add(user); //Adding new user to database
            await _context.SaveChangesAsync(); //Saving changes in database
            return new UserDto //Returning login and web token
            {
                Login = user.login,
                Token = _tokenService.CreateToken(user) //Createing web token
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) //Api to login as user
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.login == loginDto.Login); //If user not founded, return null

            if (user == null) return Unauthorized("Invalid login");

            using var hmac = new HMACSHA512(user.passwordSalt); //Sending encryption seed.
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)); //encrypting password with the same seed as in database

            for (int i = 0; i < computedHash.Length; i++) //Check that password is correct
            {
                if(computedHash[i] != user.passwordHash[i]) return Unauthorized("Invalid password"); //comparing password from input and database
            }

            return new UserDto 
            {
                Login = user.login,
                Token = _tokenService.CreateToken(user) //Creating web token
            };
        }

        private async Task<bool> UserExists(string login, string email) //Check that user allready exist in database
        {
            return await _context.Users.AnyAsync(x => x.login == login.ToLower() || x.email == email.ToLower()); //AnyAsync() checking all rows and if find correct condition, returns true
        }
    }
}