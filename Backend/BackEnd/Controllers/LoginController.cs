using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IConfiguration _configuration;
        public LoginController(ILoginService loginService, IConfiguration configuration)
        {
            _loginService = loginService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Usuario usuario)
        {
            try
            {
                usuario.Password = Encriptar.EncriptarPassword(usuario.Password);
                var user = await _loginService.ValidateUser(usuario);
                if(user == null)
                {
                    return BadRequest(new { message = "Usuario o Contraseña inválidos" });
                }
                string tokenString = JwtConfigurator.GetToken(user, _configuration);
                return Ok(new {token = tokenString});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
                throw;
            }
        }
    }
}
