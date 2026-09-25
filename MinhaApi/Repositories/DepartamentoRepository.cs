using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;
public class DepartamentoRepository : IDepartamentoRepository
{
    private readonly string _connectionString;
    public DepartamentoRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

      public IEnumerable<Departamento> GetAll() {
      var lista = new List<Departamento>();
      using var conn = new MySqlConnection(_connectionString);
      conn.Open();

      string sql = "SELECT id, nome, descricao, email, ativo FROM departamento";

      using var cmd = new MySqlCommand(sql, conn);
      using var reader = cmd.ExecuteReader();

      while (reader.Read()) {
          lista.Add(new Departamento {
              Id = reader.GetInt32("id"),
              Nome = reader.GetString("nome"),
              Descricao = reader.GetString("descricao"),
              Email = reader.GetString("email"),
              Ativo = reader.GetBoolean("ativo")
          });
      }
      return lista;
  }
    public Departamento? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

      string sql = "SELECT id, nome, descricao, email, ativo FROM departamento";
    
    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Id", id);

    using var reader = cmd.ExecuteReader();

    if (reader.Read())
    {
        return new Departamento
        {
              Id = reader.GetInt32("id"),
              Nome = reader.GetString("nome"),
              Descricao = reader.GetString("descricao"),
              Email = reader.GetString("email"),
              Ativo = reader.GetBoolean("ativo")
        };
    }

    return null;
}

    public void Add(Departamento d)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO departamento (nome, descricao, email, ativo)
                       VALUES (@Nome, @Descricao, @Email, @Ativo);
                       SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", d.Nome);
        cmd.Parameters.AddWithValue("@Descricao", d.Descricao);
        cmd.Parameters.AddWithValue("@Email", d.Email);
        cmd.Parameters.AddWithValue("@Ativo", d.Ativo);

        var idGerado = cmd.ExecuteScalar();
        d.Id = Convert.ToInt32(idGerado);
    }

    public void Update(Departamento d)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = @"UPDATE departamento 
                       SET nome = @Nome, descricao = @Descricao, email = @Email, ativo = @Ativo
                       WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", d.Id);
        cmd.Parameters.AddWithValue("@Nome", d.Nome);
        cmd.Parameters.AddWithValue("@Descricao", d.Descricao);
        cmd.Parameters.AddWithValue("@Email", d.Email);
        cmd.Parameters.AddWithValue("@Ativo", d.Ativo);
        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = @"UPDATE departamento
                       SET desativado = @Ativo
                       WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
}