using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Persistence.Repositories
{
    public class CuestionarioRepository: ICuestionarioRepository
    {
        private readonly AplicationDbContext _context;

        public CuestionarioRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateCuestionario(Cuestionario cuestionario)
        {
            _context.Add(cuestionario);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cuestionario>> GetListCuestionarioByUser(int idUser)
        {
            var listCuestionario = await _context.Cuestionarios.Where(x => x.Activo == 1 
                                                                      && x.UsuarioId == idUser).ToListAsync();
            return listCuestionario;
        }

        public async Task<Cuestionario> GetCuestionario(int idCuestionario)
        {
            var cuestionario = await _context.Cuestionarios.Where(x => x.Id == idCuestionario 
                                                                  && x.Activo == 1)
                                                                  .Include(x => x.listPregunta)
                                                                  .ThenInclude(x => x.listRespuesta)
                                                                  .FirstOrDefaultAsync();
            return cuestionario;
        }

        public async Task<Cuestionario> BuscarCuestionario(int idCuestionario, int idUsuario)
        {
            var cuestionario = await _context.Cuestionarios.Where(x => x.Id == idCuestionario
                                                                  && x.Activo == 1
                                                                  && x.UsuarioId == idUsuario).FirstOrDefaultAsync();

            return cuestionario;
        }

        public async Task EliminarCuestionario(Cuestionario cuestionario)
        {
            cuestionario.Activo = 0;
            _context.Entry(cuestionario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cuestionario>> GetListCuestionarios()
        {
            var listCuestionario = await _context.Cuestionarios.Where(x => x.Activo == 1)
                                                               .Select(o => new Cuestionario
                                                               {
                                                                   Id = o.Id,
                                                                   Nombre = o.Nombre,
                                                                   Descripcion = o.Descripcion,
                                                                   FechaCreacion = o.FechaCreacion,
                                                                   Usuario = new Usuario
                                                                   {
                                                                        UserName = o.Usuario.UserName
                                                                   }
                                                               }).ToListAsync();

            return listCuestionario;
        }
    }
}
