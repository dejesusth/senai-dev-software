using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;
public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;
    public VendaRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Venda> GetAll() {
        var lista = new List<Venda>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT v.id, v.cliente_id, v.data_venda, v.quantidade, v.valor_total, v.produto_id, c.nome AS nome_cliente, p.nome AS nome_produto FROM vendas v"
        + " JOIN clientes c ON v.cliente_id = c.id"
        + " JOIN produtos p ON v.produto_id = p.id";
        
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Venda {
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

    public Venda? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, cliente_id, data_venda,quantidade, valor_total, produto_id FROM vendas WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Venda 
            {
                Id = reader.GetInt32("id"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"),
                ProdutoId = reader.GetInt32("produto_id"),
                ClienteId = reader.GetInt32("cliente_id")
            };
        }

        return null;
    }

      public void Add(Venda venda)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO vendas (data_venda, quantidade, valor_total, produto_id, cliente_id) VALUES (@DataVenda, @Quantidade, @ValorTotal, @ProdutoId, @ClienteId)";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@DataVenda", venda.DataVenda);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.ValorTotal);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.ProdutoId);
        cmd.Parameters.AddWithValue("@ClienteId", venda.ClienteId);

        cmd.ExecuteNonQuery();
    }
}


