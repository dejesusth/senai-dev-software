using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repo;

    public ClienteService(IClienteRepository repo) => _repo = repo;

    public IEnumerable<Cliente> GetAll() => _repo.GetAll();

    public Cliente? GetById(int id) => _repo.GetById(id);

    public Cliente Add(Cliente cliente)
    {
        if(cliente.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if(cliente.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(cliente);
        return cliente;
    }

    public Cliente? Update(int id, Cliente cliente)
    {
        if (_repo.GetById(id) == null) return null;
        cliente.Id = id;
        _repo.Update(cliente);
        return cliente;
    }

    public bool Delete(int id)
{
    var cliente = _repo.GetById(id);

    if (cliente == null)
    {
        return false;
    }
    cliente.Ativo = false;

    _repo.Update(cliente);
    
    return true;
}
}