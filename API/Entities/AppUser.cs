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
        public string? passw { get; set; }
        public string? email { get; set; }
        public int tlfnr { get; set; }
        public string? fornavn { get; set; }
        public string? efternavn { get; set; }
    }
}