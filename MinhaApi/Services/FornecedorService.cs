using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class FornecedorService : IFornecedorService
{
    private readonly IFornecedorRepository _repo;

    public FornecedorService(IFornecedorRepository repo) => _repo = repo;

    public IEnumerable<Fornecedor> GetAll() => _repo.GetAll();

    public Fornecedor? GetById(int id) => _repo.GetById(id);

    public Fornecedor Add(Fornecedor fornecedor)
    {
        if(fornecedor.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if(fornecedor.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(fornecedor);
        return fornecedor;
    }

    public Fornecedor? Update(int id, Fornecedor fornecedor)
    {
        if (_repo.GetById(id) == null) return null;
        fornecedor.Id = id;
        _repo.Update(fornecedor);
        return fornecedor;
    }

    public bool Delete(int id)
{
    var fornecedor = _repo.GetById(id);

    if (fornecedor == null)
    {
        return false;
    }
    fornecedor.Ativo = false;

    _repo.Update(fornecedor);
    
    return true;
}
}