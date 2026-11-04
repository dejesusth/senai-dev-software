public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _repo;
    public DashboardService(IDashboardRepository repo) => _repo = repo;

    private static DateTime CalcularInicio(int dias)
    {
        if (dias < 1 || dias > 90)
            throw new ArgumentException("O período deve ser entre 1 e 90 dias.");
        return DateTime.Today.AddDays(-(dias - 1));
    }

    private static void ValidarLimite(int limite)
    {
        if (limite < 1 || limite > 20)
            throw new ArgumentException("O limite deve ser entre 1 e 20.");
    }

    public DashboardResumo ObterResumo(int dias)
    {
        var resumo = _repo.ObterResumo(CalcularInicio(dias));

        resumo.TicketMedio = resumo.TotalVendas > 0
            ? Math.Round(resumo.Faturamento / resumo.TotalVendas, 2)
            : 0;
        return resumo;
    }

    public List<VendasPorDia> ObterVendasPorDia(int dias)
    {
        var inicio = CalcularInicio(dias);
        var doBanco = _repo.ObterVendasPorDia(inicio)
                           .ToDictionary(v => v.Data.Date);

        var resultado = new List<VendasPorDia>();
        for (var dia = inicio; dia <= DateTime.Today; dia = dia.AddDays(1))
            resultado.Add(doBanco.TryGetValue(dia, out var v)
                ? v
                : new VendasPorDia { Data = dia });
        return resultado;
    }

    public List<TopProduto> ObterTopProdutos(int dias, int limite)
    {
        ValidarLimite(limite);
        return _repo.ObterTopProdutos(CalcularInicio(dias), limite);
    }

    public List<UltimaVenda> ObterUltimasVendas(int limite)
    {
        ValidarLimite(limite);
        return _repo.ObterUltimasVendas(limite);
    }

    public List<ProdutoEstoqueBaixo> ObterEstoqueBaixo(int minimo)
    {
        if (minimo < 0)
            throw new ArgumentException("O estoque mínimo não pode ser negativo.");
        return _repo.ObterEstoqueBaixo(minimo);
    }
}