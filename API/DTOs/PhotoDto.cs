using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoDto
    {
        public string Path { get; set; }
        public bool IsMain { get; set; }
        public int AppOfferId { get; set; }
        public IFormFile image {get; set; }
    }
}