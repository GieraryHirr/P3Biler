using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SellerDto
    {
        public int Id { get; set; }
        public string? email { get; set; }
        public string? tlfnr { get; set; }
        public string? fornavn { get; set; }
        public string? efternavn { get; set; }
        public DateTime LastActive { get; set; } = DateTime.Now;
    }
}