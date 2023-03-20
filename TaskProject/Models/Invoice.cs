using System.ComponentModel;

namespace TaskProject.Models
{
    public class Invoice : TimeStamp
    {
        public int Id { get; set; }


        [DefaultValue("cash")]
        public string PaymentMethod { get; set; }     
        
        public IList<InvoiceProduct> InvoiceProducts { get; set; }
    }
}
