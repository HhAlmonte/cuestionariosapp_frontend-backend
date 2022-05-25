namespace BackEnd.Domain.Models
{
    public class RespuestaCuestionarioDetalle
    {
        public int Id { get; set; }
        public int RespuestaCuestionarioId { get; set; }
        public RespuestaCuestionario? RespuestaCuestionario { get; set; }
        public int RespuestaId { get; set; }
        public Respuesta? Respuesta { get; set; }
    }
}
