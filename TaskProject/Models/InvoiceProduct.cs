using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class InvoiceProduct
    {
  
        public int InvoiceId { get; set; }
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }

 
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }  
        
        public int Quantity { get; set; }   
        public Double Price { get; set; }  


    }
}
