using MinhaApi.DTOs;
using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class FuncionarioRepository : IFuncionarioRepository
{
    private readonly string _connectionString;

    public FuncionarioRepository(IConfiguration config)
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Funcionario> GetAll()
    {
        var lista = new List<Funcionario>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @" SELECT f.id, f.nome, f.email, f.cpf, f.ativo, f.departamento_id
            FROM funcionarios f
            INNER JOIN departamentos d ON f.departamento_id = d.id
            ORDER BY f.nome;";

        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Funcionario
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                Cpf = reader.GetString("cpf"),
                Ativo = reader.GetBoolean("ativo"),
                DepartamentoId = reader.GetInt32("departamento_id"),
            });
        }
        return lista;
    }

    public Funcionario? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @" SELECT f.id, f.nome, f.email, f.cpf, f.ativo, f.departamento_id
            FROM funcionarios f
            INNER JOIN departamentos d ON f.departamento_id = d.id
            WHERE f.id = @Id;";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Funcionario
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                Cpf = reader.GetString("cpf"),
                Ativo = reader.GetBoolean("ativo"),
                DepartamentoId = reader.GetInt32("departamento_id"),
            };
        }
        return null;
    }

    public void Add(Funcionario f)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"
            INSERT INTO funcionarios (nome, email, cpf, ativo, departamento_id)
            VALUES (@Nome, @Email, @Cpf, @Ativo, @DepartamentoId);
            SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cpf", f.Cpf);
        cmd.Parameters.AddWithValue("@Ativo", f.Ativo);
        cmd.Parameters.AddWithValue("@DepartamentoId", f.DepartamentoId);

        f.Id = Convert.ToInt32(cmd.ExecuteScalar());
    }

    public void Update(Funcionario f)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"
            UPDATE funcionarios
            SET nome = @Nome, email = @Email, cpf = @Cpf, ativo = @Ativo, departamento_id = @DepartamentoId
            WHERE id = @Id;";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", f.Id);
        cmd.Parameters.AddWithValue("@Nome", f.Nome);
        cmd.Parameters.AddWithValue("@Email", f.Email);
        cmd.Parameters.AddWithValue("@Cpf", f.Cpf);
        cmd.Parameters.AddWithValue("@Ativo", f.Ativo);
        cmd.Parameters.AddWithValue("@DepartamentoId", f.DepartamentoId);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "DELETE FROM funcionarios WHERE id = @Id;";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }
}