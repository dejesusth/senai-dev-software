import { useState } from 'react'
import { VendaService } from '../services/vendaService'
import './venda.css'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [quantidade, setQuantidade] = useState<number | null>(null)
  const [produtoId, setProdutoId] = useState<number | null>(null)
  const [clienteId, setClienteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null) // 1. Estado de sucesso adicionado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setSucesso(null)

    if (!quantidade || !produtoId || !clienteId) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    try {
      setLoading(true)
      await VendaService.criar({ quantidade, produtoId, clienteId })
      
      // 2. Define a mensagem de sucesso
      setSucesso('Venda cadastrada com sucesso!')

      // Limpa os campos
      setQuantidade(null)
      setProdutoId(null)
      setClienteId(null)

      // 3. Aguarda 2.5 segundos com o feedback em tela antes de disparar a atualização
      setTimeout(() => {
        setSucesso(null)
        onVendaCriada()
      }, 2500)

    } catch (err: any) {
      // 4. Captura mensagem tratada da API (ex: "Estoque insuficiente", "Cliente inativo")
      const mensagemBackend = err.response?.data?.mensagem
      setErro(mensagemBackend || 'Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="venda-card-box">
      <h2 className="secao-titulo-venda">Cadastrar Venda</h2>

      {/* Alerta de Erro */}
      {erro && (
        <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
          ⚠️ {erro}
        </p>
      )}

      {/* 5. Alerta de Sucesso renderizado no JSX */}
      {sucesso && (
        <p style={{ color: '#16a34a', marginBottom: '12px', fontWeight: 500 }}>
          ✅ {sucesso}
        </p>
      )}

      <form className="venda-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            id="quantidade"
            className="form-input"
            type="number"
            placeholder="Ex: 10"
            value={quantidade ?? ''} 
            onChange={e => {
              if (erro) setErro(null)
              const val = parseInt(e.target.value)
              setQuantidade(isNaN(val) ? null : val)
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="produtoId">ID do Produto</label>
          <input
            id="produtoId"
            className="form-input"
            type="number"
            placeholder="Ex: 1"
            value={produtoId ?? ''}
            onChange={e => {
              if (erro) setErro(null)
              const val = parseInt(e.target.value)
              setProdutoId(isNaN(val) ? null : val)
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clienteId">ID do Cliente</label>
          <input
            id="clienteId"
            className="form-input"
            type="number"
            placeholder="Ex: 1"
            value={clienteId ?? ''}
            onChange={e => {
              if (erro) setErro(null)
              const val = parseInt(e.target.value)
              setClienteId(isNaN(val) ? null : val)
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