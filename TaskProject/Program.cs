using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text.Json.Serialization;
using TaskProject.Data;
using TaskProject.Helpers;
using TaskProject.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<ApplicationDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddHttpContextAccessor();
//builder.Services.AddIdentityCore<ApplicationUser>(options =>
//{
//    options.SignIn.RequireConfirmedAccount = false;

//    options.User.RequireUniqueEmail = true;
//    options.User.AllowedUserNameCharacters = null;
//    options.Password.RequireDigit = false;
//    options.Password.RequiredLength = 6;
//    options.Password.RequireNonAlphanumeric = false;
//    options.Password.RequireUppercase = false;
//    options.Password.RequireLowercase = false;

//}).AddEntityFrameworkStores<ApplicationDbContext>();


builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = "Default";
})
 .AddCookie("Default", options =>
{
    options.Cookie.Name = "defualt";
    options.LoginPath = "/login";
    options.AccessDeniedPath = "/login";
    options.ExpireTimeSpan = TimeSpan.FromDays(10);
    options.SlidingExpiration = true;
});

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCulturess = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("ar-EG")
    };
    options.DefaultRequestCulture = new RequestCulture(culture: supportedCulturess[0], uiCulture: supportedCulturess[0]);
    options.SupportedCultures = supportedCulturess;
    options.SupportedUICultures = supportedCulturess;


    options.RequestCultureProviders = new List<IRequestCultureProvider>
        {
            new QueryStringRequestCultureProvider(),
            new CookieRequestCultureProvider()

        };
});

builder.Services.AddScoped<AuthService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
var supportedCulturess = new[] { "en-US", "ar-EG" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCulturess[0])
    .AddSupportedCultures(supportedCulturess)
    .AddSupportedUICultures(supportedCulturess);
app.UseRequestLocalization(localizationOptions);




app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
