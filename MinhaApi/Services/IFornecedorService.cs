using MinhaApi.Models;
namespace MinhaApi.Services;
public interface IFornecedorService
{
    IEnumerable<Fornecedor> GetAll();
    Fornecedor? GetById(int id);
    Fornecedor  Add(Fornecedor fornecedor);
    Fornecedor? Update(int id, Fornecedor fornecedor);
    bool Delete(int id);
}