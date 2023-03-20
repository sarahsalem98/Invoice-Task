using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskProject.Models;

namespace TaskProject.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) 
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<InvoiceProduct>().HasKey(In => new { In.InvoiceId, In.ProductId });
        


        }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceProduct> InvoiceProducts { get; set; }   

        public DbSet<Product> Products { get; set; }   

        public DbSet<ApplicationUser> applicationUsers { get; set; }   
    }
}
