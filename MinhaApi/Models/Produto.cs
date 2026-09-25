namespace MinhaApi.Models;

public class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; }
        = string.Empty;

    public decimal Preco { get; set; }

    public int Estoque { get; set; }

    public bool Ativo { get; set; }
        = true;

    public int FornecedorId { get; set; }
<<<<<<< HEAD
    public string NomeFornecedor { get; set; }
        = string.Empty;
=======
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79

}