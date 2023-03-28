using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.Protocol;
using TaskProject.Data;
using TaskProject.Dtos;
using TaskProject.Models;
using Invoice = TaskProject.Models.Invoice;
using InvoiceDto = TaskProject.Dtos.Invoice;
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
        [Route("add")]
        public int Add( List<InvoiceDto>addInvoice,string paymentMethod )
        {

            if (addInvoice == null)
            {

                return 0; ;
            }
            else
            {
                List<InvoiceProduct> invoiceProduct = new List<InvoiceProduct>();
               foreach(InvoiceDto product in addInvoice) {
                    invoiceProduct.Add(new InvoiceProduct{
                        ProductId=product.ProductId,
                        Quantity=product.Qty,
                        Price=product.Price

                    });
                        
                }
                Invoice newInvoice = new Invoice
                {
                    InvoiceProducts= invoiceProduct,
                    CreatedAt=DateTime.Now,
                    UpdatedAt=DateTime.Now,
                    PaymentMethod=paymentMethod
                };
                _db.Invoices.Add(newInvoice);
                _db.SaveChanges();
                return 1;
            }
           
        }

      
    }
}
