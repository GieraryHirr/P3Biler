using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        
        public int Id { get; set; }
        public string Path { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppOffer AppOffer { get; set; }
        public int AppOfferId { get; set; }

    }
}