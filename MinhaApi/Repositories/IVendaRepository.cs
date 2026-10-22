using MinhaApi.DTOs;
using MinhaApi.Models;

namespace MinhaApi.Repositories;

public interface IVendaRepository
{
    IEnumerable<VendaResponseDto> GetAll();
    VendaResponseDto? GetById(int id);
    void Add(Venda venda);
}