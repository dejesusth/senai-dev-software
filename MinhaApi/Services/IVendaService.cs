using MinhaApi.DTOs;
namespace MinhaApi.Services;

public interface IVendaService
{
    IEnumerable<VendaResponseDto> GetAll();
    VendaResponseDto? GetById(int id);
    VendaResponseDto Add(VendaCreateDto venda);
}