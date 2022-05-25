using BackEnd.Domain.Models;

namespace BackEnd.Domain.IServices
{
    public interface ILoginService
    {
        Task<Usuario> ValidateUser(Usuario usuario);

    }
}
