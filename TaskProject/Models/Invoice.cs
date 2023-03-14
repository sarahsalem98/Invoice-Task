using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class Invoice:TimeStamp
    {
        [Key]
        public int InvoiceId { get; set; }

        [Key]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }  
        
        public int Quantity { get; set; }   
        public Double Price { get; set; }  


    }
}
