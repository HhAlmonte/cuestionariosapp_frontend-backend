using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Domain.Models
{
    public class Respuesta
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName ="varchar(50)")]
        public string? Descripcion { get; set; }

        [Required]
        public bool esCorrecta { get; set; }

        public int preguntaId { get; set; }
        public Pregunta? pregunta { get; set; }
    }
}
