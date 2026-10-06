import type { Cliente } from '../types/Cliente'

interface ClienteListProps {
  clientes: Cliente[]
  loading?: boolean
}

export default function ClienteList({ clientes, loading }: ClienteListProps) {
  // 1. Tratamento do estado de carregamento
  if (loading) {
    return <p>A carregar clientes...</p>
  }

  // 2. Garantia defensiva: garante que listaValida é SEMPRE um Array
  const listaValida = Array.isArray(clientes) ? clientes : []

  // 3. Caso a lista esteja vazia
  if (listaValida.length === 0) {
    return <p>Nenhum cliente encontrado.</p>
  }

  // 4. Renderização segura com .map()
  return (
    <div className="cliente-list">
      {listaValida.map((cliente) => (
        <div key={cliente.id || Math.random()} className="cliente-card">
          <h3>{cliente.nome}</h3>
          <p>{cliente.email}</p>
        </div>
      ))}
    </div>
  )
}