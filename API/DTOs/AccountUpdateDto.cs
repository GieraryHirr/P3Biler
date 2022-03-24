using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AccountUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Login { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Fornavn { get; set; }

        [Required]
        public string? Efternavn { get; set; }
    }
}