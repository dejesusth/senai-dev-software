using MinhaApi.Models;
using MinhaApi.Services;
using MinhaApi.Repositories;
using Microsoft.Net.Http.Headers;

namespace MinhaApi.Services
{
public class VendaService : IVendaService
{
    private readonly IVendaRepository _repo;
    private readonly IClienteRepository _clienteRepo;
    private readonly IProdutoRepository _produtoRepo;
    public VendaService(IVendaRepository repo, IClienteRepository clienteRepo, IProdutoRepository produtoRepo)
        {
            _repo = repo;
            _clienteRepo = clienteRepo;
            _produtoRepo = produtoRepo;
        }
    public IEnumerable<Venda> GetAll() => _repo.GetAll();

    public Venda? GetById(int id) => _repo.GetById(id);

private int Quantidade(Venda venda)
        {
            throw new NotImplementedException();
        }
    public Venda Add(Venda venda)
    {
        if(venda.DataVenda == null)
            throw new ArgumentException("Data inválida!");
        if(venda.ValorTotal <= 0)
            throw new ArgumentException("Valor inválido!");
        var cliente = _clienteRepo.GetById(venda.ClienteId);
        var produto = _produtoRepo.GetById(venda.ProdutoId);
        if(cliente == null)
            {
            throw new ArgumentException("Cliente não encontrado!");
            }
        if(produto == null)
            {
            throw new ArgumentException("Produto não encontrado!");
            }
        if(produto.Estoque >= Quantidade(venda))
        {
            produto.Estoque -= Quantidade(venda);
            _produtoRepo.Update(produto);
        }
        else
        {
            throw new ArgumentException("Estoque insuficiente!");
        }
        _repo.Add(venda);
        return venda;
    }


        public Venda? Update(int id, Venda venda)
    {
        if (_repo.GetById(id) == null) return null;
        venda.IdVenda = id;
        _repo.Update(venda);
        return venda;
    }

    public bool Delete(int id)
    {
        var venda = _repo.GetById(id);
        if (venda != null)
        {
            _repo.Delete(id);
            return true;
        }
        return false;
    }
}
}