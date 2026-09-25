using MinhaApi.Models;
using MySqlConnector;
namespace MinhaApi.Repositories;
<<<<<<< HEAD

=======
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
public class FornecedorRepository : IFornecedorRepository
{
    private readonly string _connectionString;
    public FornecedorRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

<<<<<<< HEAD
        public IEnumerable<Fornecedor> GetAll() {
=======
    public IEnumerable<Fornecedor> GetAll() {
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
        var lista = new List<Fornecedor>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

<<<<<<< HEAD
        string sql = "SELECT id, nome, email, cnpj, ativo FROM fornecedor f";

=======
        string sql = "SELECT id, nome, email, cnpj, ativo FROM fornecedor";
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) {
            lista.Add(new Fornecedor {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                Cnpj = reader.GetString("cnpj"),
                Ativo = reader.GetBoolean("ativo")
            });
        }
        return lista;
    }
<<<<<<< HEAD

        public Fornecedor? GetById(int id)
=======
    public Fornecedor? GetById(int id)
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

<<<<<<< HEAD
        string sql = "SELECT id, nome, email, cnpj, ativo FROM fornecedor f";

=======
        string sql = "SELECT id, nome, email, cnpj, ativo FROM fornecedor WHERE id = @Id";
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Fornecedor 
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                Cnpj = reader.GetString("cnpj"),
                Ativo = reader.GetBoolean("ativo")
            };
        }
<<<<<<< HEAD
        return null;
    }
        public void Add(Fornecedor f)
=======

        return null;
    }
    public void Add(Fornecedor f)
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "INSERT INTO fornecedor (nome, email, cnpj, ativo) VALUES (@Nome, @Email, @Cnpj, @Ativo)";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cnpj", f.Cnpj);
        cmd.Parameters.AddWithValue("@Ativo", f.Ativo);
        var idGerado = cmd.ExecuteScalar();
        f.Id = Convert.ToInt32(idGerado);
    }
<<<<<<< HEAD

        public void Update(Fornecedor f)
=======
    public void Update(Fornecedor f)
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "UPDATE fornecedor SET nome = @Nome, email = @Email, cnpj = @Cnpj, ativo = @Ativo WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cnpj", f.Cnpj);
        cmd.Parameters.AddWithValue("@Ativo", f.Ativo);
        cmd.Parameters.AddWithValue("@Id", f.Id);
        cmd.ExecuteNonQuery();
    }

        public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM fornecedor WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> f59094a4ae879af44ae10f37cca243b94b338e79
