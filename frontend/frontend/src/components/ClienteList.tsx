import type { Cliente } from '../types/Cliente.ts'

interface Props {
  clientes: Cliente[]
  loading: boolean
}

function ClienteList({ clientes, loading }: Props) {
  return (
    <div className="card">
      <h2 className="card-title">Clientes Cadastrados</h2>

      {loading ? (
        <p style={{ color: '#64748b' }}>Carregando...</p>
      ) : clientes.length === 0 ? (
        <p style={{ color: '#64748b' }}>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <div className="list-container">
          {clientes.map(c => (
            <div key={c.id} className="list-item">
              <div>
                <div className="list-item-title">{c.nome}</div>
                <div className="list-item-subtitle">
                  {c.email}{c.cpf ? ` • CPF: ${c.cpf}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClienteList