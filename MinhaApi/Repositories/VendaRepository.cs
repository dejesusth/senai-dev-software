using MinhaApi.Models;
using MinhaApi.DTOs;
using MySqlConnector;
namespace MinhaApi.Repositories;

public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;
    public VendaRepository(IConfiguration config)
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<VendaResponseDto> GetAll()
    {
        var lista = new List<VendaResponseDto>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"SELECT v.id, v.data_venda, v.quantidade, v.valor_total, v.produto_id, p.nome AS nome_produto, v.cliente_id, c.nome AS nome_cliente FROM vendas v
        INNER JOIN produtos p ON v.produto_id = p.id
        INNER JOIN clientes c ON v.cliente_id = c.id
        ORDER BY v.data_venda DESC";

        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new VendaResponseDto
            {
                Id = reader.GetInt32("id"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"),
                ProdutoId = reader.GetInt32("produto_id"),
                NomeProduto = reader.GetString("nome_produto"),
                ClienteId = reader.GetInt32("cliente_id"),
                NomeCliente = reader.GetString("nome_cliente")
            });
        }
        return lista;
    }

    public VendaResponseDto? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"SELECT v.id, v.data_venda, v.quantidade, v.valor_total, v.produto_id, p.nome AS nome_produto, v.cliente_id, c.nome AS nome_cliente FROM vendas v
        INNER JOIN produtos p ON v.produto_id = p.id
        INNER JOIN clientes c ON v.cliente_id = c.id
        WHERE v.id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new VendaResponseDto
            {
                Id = reader.GetInt32("id"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"),
                ProdutoId = reader.GetInt32("produto_id"),
                NomeProduto = reader.GetString("nome_produto"),
                ClienteId = reader.GetInt32("cliente_id"),
                NomeCliente = reader.GetString("nome_cliente")
            };
        }

        return null;
    }

    public void Add(Venda venda)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO vendas (data_venda, quantidade, valor_total, produto_id, cliente_id) VALUES (@DataVenda, @Quantidade, @ValorTotal, @ProdutoId, @ClienteId);
        SELECT LAST_INSERT_ID();";


        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@DataVenda", venda.DataVenda);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.ValorTotal);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.ProdutoId);
        cmd.Parameters.AddWithValue("@ClienteId", venda.ClienteId);

        venda.Id = Convert.ToInt32(cmd.ExecuteScalar());
    }
}