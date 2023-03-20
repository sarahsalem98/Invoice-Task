namespace TaskProject.Dtos
{
    public class AddInvoice
    {
        public string PaymentMethod { get; set; }   
        public int ProductId { get;set; }
        public int Qty { get; set; }
        public double Price { get; set; }


        
    }
}
