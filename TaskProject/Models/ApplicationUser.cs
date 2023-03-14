using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    [Table("ApplicationUser")]
    public class ApplicationUser
    {
        [Key]
        public  int Id { get; set; }
        public  string fullName { get; set; }
        public  string PhoneNumber { get; set; }
       
        public   string UserName { get; set; }
        public   string Email { get; set; }
        public   bool   EmailConfirmed { get; set; }
        public   string Password { get; set; }
        public   bool    IsAdmin { get; set; }   
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
       }  


    }
