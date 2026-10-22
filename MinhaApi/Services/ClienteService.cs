using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repo;

    public ClienteService(IClienteRepository repo) => _repo = repo;

    public IEnumerable<Cliente> GetAll() => _repo.GetAll();

    public Cliente? GetById(int id) => _repo.GetById(id);

    public Cliente Create(Cliente cliente)
    {
        if (cliente.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if (cliente.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(cliente);
        return cliente;
    }

    public Cliente? Update(int id, Cliente c)
    {
        if (_repo.GetById(id) == null) return null;
        c.Id = id;
        _repo.Update(c);
        return c;
    }

    public bool Delete(int id)
    {
        var cliente = _repo.GetById(id);

        if (cliente == null || !cliente.Ativo)
        {
            return false;
        }
        cliente.Ativo = false;

        _repo.Update(cliente);

        return true;
    }
}