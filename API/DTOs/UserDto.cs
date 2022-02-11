using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string? Login { get; set; }
        public int Id { get; set; }
        public string? Token { get; set; }
    }
}