namespace MinhaApi.Models;

public class Venda
{
    public int Id { get; set; }

    public DateTime DataVenda { get; set; }

    public int Quantidade { get; set; }

    public decimal ValorTotal { get; set; }

    public int ProdutoId { get; set; }
    
    public string NomeProduto { get; set; }
        = string.Empty;
    public int ClienteId { get; set; }

    public string NomeCliente { get; set; }
        = string.Empty;
}