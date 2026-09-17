using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;
public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;
    public VendaRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    private static List<Venda> _db = new()
    {
        new Venda { Id=1, DataVenda=DateTime.Now, ValorTotal=100.00m, ProdutoId=1, ClienteId=1 }
    };
    public IEnumerable<Venda> GetAll() {
        var lista = new List<Venda>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, cliente_id, data_venda, valor_total FROM vendas";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Venda {
                Id = reader.GetInt32("id"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor_total"),
                ProdutoId = reader.GetInt32("produto_id"),
                ClienteId = reader.GetInt32("cliente_id")
            });
        }
        return lista;
    }

    public Venda? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, cliente_id, data_venda, valor_total FROM vendas WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Venda 
            {
                Id = reader.GetInt32("id"),
                DataVenda = reader.GetDateTime("data_venda"),
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
        cmd.Parameters.AddWithValue("@ProdutoId", venda.Id);
        cmd.Parameters.AddWithValue("@ClienteId", venda.Id);

        cmd.ExecuteNonQuery();
    }
    public void Update(Venda venda)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "UPDATE vendas SET data_venda = @DataVenda, valor_total = @ValorTotal, produto_id = @ProdutoId, cliente_id = @ClienteId WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", venda.Id);
        cmd.Parameters.AddWithValue("@DataVenda", venda.DataVenda);
        cmd.Parameters.AddWithValue("@Quantidade", venda.Quantidade);
        cmd.Parameters.AddWithValue("@ValorTotal", venda.ValorTotal);
        cmd.Parameters.AddWithValue("@ProdutoId", venda.ProdutoId);
        cmd.Parameters.AddWithValue("@ClienteId", venda.ClienteId);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM vendas WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}


