import { useState } from 'react'
import { clienteService } from '../services/ClienteService'
import './cliente.css'

interface Props {
  onClienteCriado: () => void
}

function ClienteForm({ onClienteCriado }: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      await clienteService.criar({ nome, email, cpf })
      setNome('')
      setEmail('')
      setCpf('')
      onClienteCriado()
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cliente-container">
      <h2 className="secao-titulo">Cadastrar Cliente</h2>

      {erro && (
        <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
          {erro}
        </p>
      )}

      <form className="cliente-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            className="form-input"
            type="text"
            placeholder="Ex: João Silva"
            value={nome}
            onChange={e => {
              if (erro) setErro(null)
              setNome(e.target.value)
            }}
            disabled={loading}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="form-input"
            type="email"
            placeholder="Ex: joao@email.com"
            value={email}
            onChange={e => {
              if (erro) setErro(null)
              setEmail(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            className="form-input"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={e => {
              if (erro) setErro(null)
              setCpf(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn-cadastrar" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default ClienteForm