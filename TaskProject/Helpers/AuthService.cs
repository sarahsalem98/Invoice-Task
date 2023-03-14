using System.Security.Cryptography;
using System.Text;

namespace TaskProject.Helpers
{
    public class AuthService
    {
        public string HashPassword(string password)
        {
            SHA256 hash = SHA256.Create();
            var passwordBytes = Encoding.Default.GetBytes(password);
            var hashedPssword = hash.ComputeHash(passwordBytes);
            return Convert.ToHexString(hashedPssword);
        }

        public bool ValidatePassword(string hashedPassword, string password)
        {
            if (HashPassword(password) == hashedPassword)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
