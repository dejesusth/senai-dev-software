using MinhaApi.Models;
namespace MinhaApi.Repositories;
public interface IFornecedorRepository
{
    IEnumerable<Fornecedor> GetAll();
    Fornecedor? GetById(int id);
    void Add(Fornecedor fornecedor);
    void Update(Fornecedor fornecedor);
<<<<<<< HEAD
    void Delete(int id);
}
=======
}   
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
