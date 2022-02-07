using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto //We mapping data from view to DTO, and then mapping DTO with Entity object. It's much more safety.
    {
        [Required]
        public string? Login { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        [Phone]
        public string? Tlfnr { get; set; }
        [Required]
        public string? Fornavn { get; set; }
        [Required]
        public string? Efternavn { get; set; }
    }
}