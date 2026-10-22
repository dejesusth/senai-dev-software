using Microsoft.AspNetCore.Mvc;
using MinhaApi.DTOs;
using MinhaApi.Services;

namespace MinhaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendaController : ControllerBase
    {
        private readonly IVendaService _service;

        public VendaController(IVendaService service) => _service = service;

        [HttpGet]
        public IActionResult GetAll()
        {
            var vendas = _service.GetAll();
            return Ok(vendas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var venda = _service.GetById(id);
            if (venda == null)
                return NotFound(new { mensagem = "Venda não encontrada." });

            return Ok(venda);
        }

        [HttpPost]
        public IActionResult Create([FromBody] VendaCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var criado = _service.Add(dto);
                return CreatedAtAction(nameof(GetById), new { id = criado.Id }, criado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }
    }
}