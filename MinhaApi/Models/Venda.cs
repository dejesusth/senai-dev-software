namespace MinhaApi.Models;

public class Venda
{
    public int IdVenda { get; set; }
    public DateOnly DataVenda { get; set; }
    public TimeOnly HorarioVenda { get; set; }
    public decimal ValorTotal { get; set; }
    public int ProdutoId { get; set; }
    public int ClienteId { get; set; }

}