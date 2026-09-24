using System.Threading.Tasks.Dataflow;
using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;
public class ProdutoRepository : IProdutoRepository
{
    private readonly string _connectionString;
    public ProdutoRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

      public IEnumerable<Produto> GetAll() {
      var lista = new List<Produto>();
      using var conn = new MySqlConnection(_connectionString);
      conn.Open();

      string sql = "SELECT id, nome, preco, estoque, ativo, f.id AS id, f.nome as Fornecedor FROM produtos"
      + "JOIN fornecedor f ON p.fornecedor_id = f.id";

      using var cmd = new MySqlCommand(sql, conn);
      using var reader = cmd.ExecuteReader();

      while (reader.Read()) {
          lista.Add(new Produto {
              Id = reader.GetInt32("id"),
              Nome = reader.GetString("nome"),
              Preco = reader.GetDecimal("preco"),
              Estoque = reader.GetInt32("estoque"),
              Ativo = reader.GetBoolean("ativo"),
              FornecedorId = reader.GetInt32("f.id"),
              NomeFornecedor = reader.GetString("f.nome")
          });
      }
      return lista;
  }
    public Produto? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

   string sql = "SELECT id, nome, preco, estoque, ativo, f.id AS id, f.nome as Fornecedor FROM produtos"
      + "JOIN fornecedor f ON p.fornecedor_id = f.id";
    
    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Id", id);

    using var reader = cmd.ExecuteReader();

    if (reader.Read())
    {
        return new Produto 
        {
              Id = reader.GetInt32("id"),
              Nome = reader.GetString("nome"),
              Preco = reader.GetDecimal("preco"),
              Estoque = reader.GetInt32("estoque"),
              Ativo = reader.GetBoolean("ativo"),
              FornecedorId = reader.GetInt32("f.id"),
              NomeFornecedor = reader.GetString("f.nome")
        };
    }

    return null;
}

    public void Add(Produto p)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO produtos (nome, preco, estoque, ativo, fornecedor_id)
                       VALUES (@Nome, @Preco, @Estoque, @Ativo, @Fornecedor_Id);
                       SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);
        cmd.Parameters.AddWithValue("@Fornecedor_Id", p.FornecedorId);
        

        // Executa a inserção e recupera o ID gerado pelo MySQL
        var idGerado = cmd.ExecuteScalar();
        p.Id = Convert.ToInt32(idGerado);
    }

    public void Update(Produto p)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = @"UPDATE produtos 
                       SET nome = @Nome, preco = @Preco, estoque = @Estoque, ativo = @Ativo, fornecedor_id = @Fornecedor_Id
                       WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", p.Id);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);
        cmd.Parameters.AddWithValue("@Fornecedor_Id", p.FornecedorId);
        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM produtos WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}