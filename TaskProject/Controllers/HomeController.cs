using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol;
using System.Diagnostics;
using TaskProject.Data;
using TaskProject.Dtos;
using TaskProject.Helpers;
using TaskProject.Models;

namespace TaskProject.Controllers
{
    public class HomeController : Controller
    {


        private readonly ApplicationDbContext _db;
        private readonly AuthService _authService;

        public HomeController(
            ApplicationDbContext db,
            AuthService authService
            
            )
        {
            _db = db;     
            _authService = authService; 
        }

        [Authorize(AuthenticationSchemes ="Default")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("getUsers")]
        public string GetUsers()
        { return   _db.applicationUsers.ToJson();
           
            
        }
        [HttpGet]
        public IActionResult setLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
                                    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                                    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
                );

            return LocalRedirect(returnUrl);
        }
        [Authorize(Roles ="Admin")]
        public int addUser(RegisterRequest addUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return 2;
            }
            var user = _db.applicationUsers.FirstOrDefault(u => u.UserName == addUserRequest.UserName);
            if (user != null)
            {
                ApplicationUser newUser = new ApplicationUser();
                newUser.PhoneNumber = addUserRequest.PhoneNumber;
                newUser.UserName = addUserRequest.UserName;
                newUser.fullName = addUserRequest.fullName;
                newUser.Password = _authService.HashPassword(addUserRequest.Password);
                newUser.Email = addUserRequest.Email;
                _db.applicationUsers.Add(newUser);
                _db.SaveChanges();
                return 1;
            }
            else
            {
                return 0;

            }


        }
        [Authorize(Roles = "Admin")]
        [Route("edit/user/{id}")]
        public IActionResult EditUser(int Id)
        {
            ApplicationUser user = _db.applicationUsers.FirstOrDefault(u => u.Id == Id);
            if (user != null)
            {
                return View(user);
            }
            else
            {
                return BadRequest();
            }

        }
        [Authorize(Roles = "Admin")]
        
        public IActionResult UpdateUser(ApplicationUser user)
        {
            ApplicationUser createdUser = _db.applicationUsers.FirstOrDefault(u => u.Id == user.Id);
            if (createdUser != null)
            {
                createdUser.PhoneNumber= user.PhoneNumber;
                createdUser.Email = user.Email;
                createdUser.UserName = user.UserName;
                createdUser.fullName= user.fullName;
                _db.applicationUsers.Update(createdUser);
                _db.SaveChanges();
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return BadRequest();
            }
               
        }


    }
}