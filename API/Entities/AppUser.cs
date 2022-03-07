using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Users")] //Set table name as "Users"
    public class AppUser
    {
        public int Id { get; set; }
        public string? login { get; set; }
        public byte[]? passwordHash { get; set; }
        public byte[]? passwordSalt { get; set; }
        public string? email { get; set; }
        public string? fornavn { get; set; }
        public string? efternavn { get; set; }
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<AppOffer> Offer { get; set; }
    }
}