namespace TaskProject.Dtos
{
    public class RegisterRequest
    {
        public string fullName { get; set; }
        public string PhoneNumber { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string? Password { get; set; }
        public string? IsAdmin { get; set; }

     
    }
}
