namespace TaskProject.Models
{
    public class Product:TimeStamp
    {
        public int Id { get; set; }
        public string Name_EN { get; set; }
        public string? Name_AR { get; set; }    
    }
}
