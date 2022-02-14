using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string? Path { get; set; }
        public bool IsMain { get; set; }
    }
}