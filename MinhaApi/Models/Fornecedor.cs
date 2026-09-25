namespace MinhaApi.Models;

public class Fornecedor
{
    public int Id { get; set; }

    public string Nome { get; set; }
        = string.Empty;

    public string Email { get; set; }
        = string.Empty;

    public string Cnpj { get; set; }
        = string.Empty;
<<<<<<< HEAD

    public bool Ativo { get; set; }
        = true;

=======
        
    public bool Ativo { get; set; }
        = true;
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
}