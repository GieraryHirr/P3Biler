using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OfferDto
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }
        public int Kilometers { get; set; }
        public int ModelYear { get; set; }
        public int EngineSize { get; set; }
        public int Horsepowers { get; set; }
        public int Post { get; set; }
        public string City { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public string Fuel { get; set; }
        public string Gearbox { get; set; }
        public string Description { get; set; }
        public string tlfnr { get; set; }
        public int AppUserId { get; set; }
    }
}