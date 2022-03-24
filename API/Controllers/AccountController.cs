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
            if (await LoginExists(registerDto.Login)) return BadRequest("Login  is taken"); //if user exist return bad request
            if (await EmailExists(registerDto.Email)) return BadRequest("Email is taken"); //if user exist return bad request


            using var hmac = new HMACSHA512(); //Password encryption

            var user = new AppUser //Mapping DTO to new AppUser
            {
                login = registerDto.Login,
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                passwordSalt = hmac.Key,
                email = registerDto.Email,
                fornavn = registerDto.Fornavn,
                efternavn = registerDto.Efternavn
            };

            _context.Users.Add(user); //Adding new user to database
            await _context.SaveChangesAsync(); //Saving changes in database
            return new UserDto //Returning login and web token
            {
                Id = user.Id,
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
                if (computedHash[i] != user.passwordHash[i]) return Unauthorized("Invalid password"); //comparing password from input and database
            }

            return new UserDto
            {
                Login = user.login,
                Id = user.Id,
                Token = _tokenService.CreateToken(user) //Creating web token
            };
        }

        private async Task<bool> LoginExists(string login) //Check that user allready exist in database
        {
            return await _context.Users.AnyAsync(x => x.login == login.ToLower()); //AnyAsync() checking all rows and if find correct condition, returns true
        }

        private async Task<bool> EmailExists(string email) //Check that user allready exist in database
        {
            return await _context.Users.AnyAsync(x => x.email == email.ToLower()); //AnyAsync() checking all rows and if find correct condition, returns true
        }

        [HttpPut("update-account")]
        public async Task<ActionResult> UpdateAccount(AccountUpdateDto registerDto)
        { //Update account


            var account = await _context.Users.FindAsync(registerDto.Id);

            if (await LoginExists(registerDto.Login) && registerDto.Login != account.login) return BadRequest("Login  is taken"); //if user exist return bad request
            if (await EmailExists(registerDto.Email) && registerDto.Email != account.email) return BadRequest("Email is taken"); //if user exist return bad request

            account.login = registerDto.Login;
            account.email = registerDto.Email;
            account.fornavn = registerDto.Fornavn;
            account.efternavn = registerDto.Efternavn;
            _context.Users.Update(account);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        //api/account/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountUpdateDto>> GetAccount(int id) //API to get selected user
        {
            var user = await _context.Users.FindAsync(id);

            var account = new AccountUpdateDto {
                Id = user.Id,
                Login = user.login,
                Email = user.email,
                Fornavn = user.fornavn,
                Efternavn = user.efternavn
            };
            return Ok(account);
        }
    }
}