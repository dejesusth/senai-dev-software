import { useState } from 'react'
import { VendaService } from '../services/VendaService'
import './venda.css'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [data_venda, setDataVenda] = useState<Date | null>(null)
  const [quantidade, setQuantidade] = useState<number | null>(null)
  const [valor_total, setValorTotal] = useState<number | null>(null)
  const [produto_id, setProdutoId] = useState<number | null>(null)
  const [cliente_id, setClienteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      await VendaService.criar({ data_venda, quantidade, valor_total, produto_id, cliente_id })
      setDataVenda(null)
      setQuantidade(null)
      setValorTotal(null)
      setProdutoId(null)
      setClienteId(null)
      onVendaCriada()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

return (
  <div className="venda-card-box">
    <h2 className="secao-titulo-venda">Cadastrar Venda</h2>

    {erro && (
      <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
        {erro}
      </p>
    )}

    <form className="venda-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="data_venda">Data da Venda</label>
        <input
          id="data_venda"
          className="form-input"
          type="date"
          placeholder="Ex: 2026-09-18 19:43:17"
          value={data_venda ? data_venda.toISOString().split('T')[0] : ''}
          onChange={e => {
            if (erro) setErro(null)
            setDataVenda(new Date(e.target.value))
          }}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantidade">Quantidade</label>
        <input
          id="quantidade"
          className="form-input"
          type="number"
          placeholder="Ex: 10"
          value={quantidade}
          onChange={e => {
            if (erro) setErro(null)
            setQuantidade(parseInt(e.target.value))
          }}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="valor_total">Valor Total</label>
        <input
          id="valor_total"
          className="form-input"
          type="text"
          placeholder="Ex: 100.00"
          value={valor_total}
          onChange={e => {
            if (erro) setErro(null)
            setValorTotal(parseFloat(e.target.value))
          }}
          disabled={loading}
          required
        />
      </div>

        <div className="form-group">
            <label htmlFor="produto_id">ID do Produto</label>
            <input
                id="produto_id"
                className="form-input"
                type="number"
                placeholder="Ex: 1"
                value={produto_id}
                onChange={e => {
                    if (erro) setErro(null)
                    setProdutoId(parseInt(e.target.value))
                }}
                disabled={loading}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="cliente_id">ID do Cliente</label>
            <input
                id="cliente_id"
                className="form-input"
                type="number"
                placeholder="Ex: 1"
                value={cliente_id}
                onChange={e => {
                    if (erro) setErro(null)
                    setClienteId(parseInt(e.target.value))
                }}
                disabled={loading}
                required
            />
        </div>

      <button type="submit" className="btn-cadastrar-venda" disabled={loading}>
        {loading ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  </div>
)
}

export default VendaForm