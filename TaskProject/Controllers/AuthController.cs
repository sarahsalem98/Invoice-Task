using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NuGet.Protocol;
using System.Security.Claims;
using TaskProject.Data;
using TaskProject.Dtos;
using TaskProject.Helpers;
using TaskProject.Models;

namespace TaskProject.Controllers
{
    public class AuthController : Controller
    {
       
      
        private readonly ApplicationDbContext _db;
        private readonly IHttpContextAccessor _httpContext;
        private readonly AuthService _authService;
        public AuthController(
            
            ApplicationDbContext db      
            , IHttpContextAccessor httpContext
            ,AuthService authService
            )
        {
     
            _db = db;
            _httpContext = httpContext;
            _authService = authService;
        }
    
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("register")]
        public IActionResult Register()
        {
            return View();  
        }
        [HttpGet]
        [Route("login")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterOnPost(RegisterRequest registerRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Fgfdg");
            }
          
            
        var createdUser=_db.applicationUsers.FirstOrDefault(user=>user.UserName== registerRequest.UserName);
            if (createdUser == null)
            {
                ApplicationUser user=new ApplicationUser(); 
                user.Email= registerRequest.Email;
                user.UserName = registerRequest.UserName;
                user.PhoneNumber = registerRequest.PhoneNumber;
                user.fullName = registerRequest.fullName;
                user.Password=_authService.HashPassword(registerRequest.Password);
                user.IsAdmin = (_db.applicationUsers.Any() == false) ? true:false;

                 _db.applicationUsers.Add(user);
                 _db.SaveChanges();
                
             await _httpContext.HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(
                     new Claim[]
                     {
                      new Claim (ClaimTypes.NameIdentifier,user.Id.ToString()),
                      new Claim(ClaimTypes.Name,user.UserName),
                      new Claim(ClaimTypes.Email,user.Email),
                      new Claim(ClaimTypes.MobilePhone,user.PhoneNumber),
                      new Claim(ClaimTypes.Role,user.IsAdmin?"Admin":"User")
                     }, "Default")));

                return RedirectToAction("index", "Home");


            }
            else
            {
                return BadRequest("here");
            }
            


        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginOnPost(LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("no valdition");

            }
            var user=_db.applicationUsers.FirstOrDefault(u=>u.UserName==loginRequest.UserName);
            if(user!=null) {
                if (_authService.ValidatePassword(user.Password, loginRequest.Password))
                {
                    await _httpContext.HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(
                  new Claim[]
                  {
                      new Claim (ClaimTypes.NameIdentifier,user.Id.ToString()),
                      new Claim(ClaimTypes.Name,user.UserName),
                      new Claim(ClaimTypes.Email,user.Email),
                      new Claim(ClaimTypes.MobilePhone,user.PhoneNumber),
                      new Claim(ClaimTypes.Role,user.IsAdmin?"Admin":"User")
                  }, "Default")));
                    return RedirectToAction("index", "Home");
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        public async Task <IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _httpContext.HttpContext.SignOutAsync("Default");
                return RedirectToAction("Login", "Auth");

            }
            else
            {
              return  BadRequest();
            }



        }
    }
}
