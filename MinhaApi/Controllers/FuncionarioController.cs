using MinhaApi.Models;
using MinhaApi.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class FuncionarioController : ControllerBase
{
    private readonly IFuncionarioService _service;

    public FuncionarioController(IFuncionarioService service) => _service = service;

    [HttpGet]
    public IActionResult GetAll()
    {
        var funcionario = _service.GetAll();
        return Ok(funcionario);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var funcionario = _service.GetById(id);
        if (funcionario == null)
            return NotFound();
        return Ok(funcionario);
    }

    [HttpPost] 
    public IActionResult Create([FromBody] Funcionario funcionario)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var criado = _service.Add(funcionario);

        return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Funcionario funcionario)
    {
        var atualizado = _service.Update(id, funcionario);

        if (atualizado == null)
            return NotFound();

        return Ok(atualizado);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        bool deletado = _service.Delete(id);

        if (!deletado)
            return NotFound();

        return NoContent();
    }
}