using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;

namespace BackEnd.Services
{
    public class UsuarioService: IUsuarioServices
    {
        private readonly IUsuarioRepository _usuariorepository;
        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuariorepository = usuarioRepository;
        }

        public async Task SaveUser(Usuario usuario)
        {
            await _usuariorepository.SaveUser(usuario);
        }

        public async Task<bool> ValidateExistence(Usuario usuario)
        {
            return await _usuariorepository.ValidateExistence(usuario);
        }
        public async Task<Usuario> ValidatePassword(int idUsuario, string passwordAnterior)
        {
            return await _usuariorepository.ValidatePassword(idUsuario, passwordAnterior);
        }
        public async Task UpdatePassword(Usuario usuario)
        {
            await _usuariorepository.UpdatePassword(usuario);
        }
    }
}
