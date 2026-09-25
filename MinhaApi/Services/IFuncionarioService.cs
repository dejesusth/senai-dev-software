using MinhaApi.Models;
namespace MinhaApi.Services;
public interface IFuncionarioService
{
    IEnumerable<Funcionario> GetAll();
    Funcionario? GetById(int id);
    Funcionario  Add(Funcionario funcionario);
    Funcionario? Update(int id, Funcionario funcionario);
    bool Delete(int id);
}