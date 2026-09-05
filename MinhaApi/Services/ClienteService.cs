using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;
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

    public bool Delete(int id, Cliente cliente)
    {
        if (_repo.GetById(id) == null) return false;
        cliente.Ativo = false;
        if (cliente != null){
            _repo.Update(cliente);
            return true;
        }
        return false;
    }
}