using BackEnd.Domain.Models;

namespace BackEnd.Domain.IServices
{
    public interface IUsuarioServices
    {
        Task SaveUser(Usuario usuario);
        Task<bool> ValidateExistence(Usuario usuario);
        Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior);
        Task UpdatePassword(Usuario usuario);
    }
}
