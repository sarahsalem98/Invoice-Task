using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.Protocol;
using TaskProject.Data;
using TaskProject.Dtos;
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
        public List<Invoice> getInvoices()
        {
           return _db.Invoices.Include("InvoiceProducts").ToList();

    

        }
        [HttpGet]
        [Route("invoice/create")]
        public IActionResult Create()
        {
            ViewBag.products=_db.Products.ToList();
            return View();
        }


        [HttpPost]
        public IActionResult Add()
        {

            return Ok("ghgf");

        }

      
    }
}
