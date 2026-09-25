using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class DepartamentoService : IDepartamentoService
{
    private readonly IDepartamentoRepository _repo;

    public DepartamentoService(IDepartamentoRepository repo) => _repo = repo;

    public IEnumerable<Departamento> GetAll() => _repo.GetAll();

    public Departamento? GetById(int id) => _repo.GetById(id);

    public Departamento Add(Departamento departamento)
    {
        if (departamento.Nome == null)
            throw new ArgumentException("Nome obrigatório!");
        _repo.Add(departamento);
        return departamento;
    }

    public Departamento? Update(int id, Departamento d)
    {
        if (_repo.GetById(id) == null) return null;
        d.Id = id;
        _repo.Update(d);
        return d;
    }

    public bool Delete(int id)
{
    var departamento = _repo.GetById(id);
    if (departamento == null)
    {
        return false;
    }
    departamento.Ativo = false;
    _repo.Update(departamento);
    return true;
}
}