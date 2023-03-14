using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using TaskProject.Data;
using TaskProject.Models;

namespace TaskProject.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly ApplicationDbContext _db;
        public InvoiceController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("getInvoices")]
        public string getInvoices()
        {
           return  _db.Invoices.GroupBy(i => i.InvoiceId).Select(i => i.First()).ToJson();

          

        }
    }
}
