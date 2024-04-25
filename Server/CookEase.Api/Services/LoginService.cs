using Application.DTOs.Login;
using CookEase.Api.Interfaces;

namespace CookEase.Api.Services
{
    public class LoginService : ILoginService
    {
        //TODO actually implement authentication
        public LoginResponse? Authenticate(LoginRequest loginRequest)
        {

            if(loginRequest.Username == "username" || loginRequest.Password == "password")
            {
                return new LoginResponse { UserId = 69 };
            }
            else
            {
                return null;
            }
        }
    }
}
