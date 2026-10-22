using MinhaApi.DTOs;
using MinhaApi.Models;
using MinhaApi.Repositories;

namespace MinhaApi.Services
{
    public class VendaService : IVendaService
    {
        private readonly IVendaRepository _repo;
        private readonly IClienteRepository _clienteRepo;
        private readonly IProdutoRepository _produtoRepo;

        public VendaService(
            IVendaRepository repo, 
            IClienteRepository clienteRepo, 
            IProdutoRepository produtoRepo)
        {
            _repo = repo;
            _clienteRepo = clienteRepo;
            _produtoRepo = produtoRepo;
        }

        public IEnumerable<VendaResponseDto> GetAll() => _repo.GetAll();

        public VendaResponseDto? GetById(int id) => _repo.GetById(id);

        public VendaResponseDto Add(VendaCreateDto dto)
        {
            if (dto.Quantidade <= 0)
            {
                throw new ArgumentException("Quantidade inválida!");
            }

            var cliente = _clienteRepo.GetById(dto.ClienteId);
            if (cliente == null || !cliente.Ativo)
            {
                throw new ArgumentException("Cliente não encontrado ou inativo!");
            }

            var produto = _produtoRepo.GetById(dto.ProdutoId);
            if (produto == null || !produto.Ativo)
            {
                throw new ArgumentException("Produto não encontrado ou inativo!");
            }

            if (produto.Estoque < dto.Quantidade)
            {
                throw new ArgumentException("Estoque insuficiente!");
            }

            produto.Estoque -= dto.Quantidade;
            _produtoRepo.Update(produto);

            var venda = new Venda
            {
                ClienteId = dto.ClienteId,
                ProdutoId = dto.ProdutoId,
                Quantidade = dto.Quantidade,
                ValorTotal = produto.Preco * dto.Quantidade,
                DataVenda = DateTime.Now
            };

            _repo.Add(venda);

            return new VendaResponseDto
            {
                Id = venda.Id,
                DataVenda = venda.DataVenda,
                Quantidade = venda.Quantidade,
                ValorTotal = venda.ValorTotal,
                ProdutoId = produto.Id,
                NomeProduto = produto.Nome,
                ClienteId = cliente.Id,
                NomeCliente = cliente.Nome
            };
        }
    }
}