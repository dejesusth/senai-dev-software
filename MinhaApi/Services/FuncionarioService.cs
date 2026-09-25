using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
public class FuncionarioService : IFuncionarioService
{
    private readonly IFuncionarioRepository _repo;

    public FuncionarioService(IFuncionarioRepository repo) => _repo = repo;

    public IEnumerable<Funcionario> GetAll() => _repo.GetAll();

    public Funcionario? GetById(int id) => _repo.GetById(id);

    public Funcionario Add(Funcionario funcionario)
    {
        if(funcionario.Nome == null)
            throw new ArgumentException("Nome inválido!");
        if(funcionario.Email == null)
            throw new ArgumentException("Email inválido!");
        _repo.Add(funcionario);
        return funcionario;
    }

    public Funcionario? Update(int id, Funcionario funcionario)
    {
        if (_repo.GetById(id) == null) return null;
        funcionario.Id = id;
        _repo.Update(funcionario);
        return funcionario;
    }

    public bool Delete(int id)
{
    var funcionario = _repo.GetById(id);
    if (funcionario == null)
    {
        return false;
    }
    funcionario.Ativo = false;
    _repo.Update(funcionario);
    return true;
}
}