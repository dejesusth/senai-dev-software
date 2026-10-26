import { useEffect, useState } from 'react'
import type { Cliente } from '../types/Cliente'
import { clienteService } from '../services/clienteService.ts'
import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'
import { mostrarToast } from '../services/toastService.ts'
import { ConfirmModal } from '../components/ConfirmModal.tsx'

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)

  const [clienteParaExcluir, setClienteParaExcluir] = useState<Cliente | null>(null)

const carregarClientes = async () => {
  setLoading(true)
  try {
    const dados = await clienteService.listar()
    
    // Se a API/Service retornar um objeto { data: [...] } ou undefined/null
    if (Array.isArray(dados)) {
      setClientes(dados)
    } else if (dados && Array.isArray((dados as any).data)) {
      setClientes((dados as any).data)
    } else {
      setClientes([]) // Fallback para lista vazia
    }
  } catch (error) {
    console.error("Erro ao carregar clientes:", error)
    mostrarToast('Erro ao carregar clientes.', 'erro')
    setClientes([])
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { carregarClientes() }, [])

  const handleClienteCriado = () => {
    carregarClientes()
    mostrarToast('Cliente cadastrado com sucesso!', 'sucesso')
  }

  const handleConfirmarExclusao = async () => {
    if (!clienteParaExcluir) return

    try {
      await clienteService.deletar(clienteParaExcluir.id)
      mostrarToast('Cliente excluído com sucesso!', 'sucesso')
      carregarClientes()
    } catch {
      mostrarToast('Erro ao tentar excluir o cliente.', 'erro')
    } finally {
      setClienteParaExcluir(null)
    }
  }

  return (<div>
    <h1>Gestão de Clientes</h1>
    <ClienteForm onClienteCriado={handleClienteCriado} />
    <ClienteList
    clientes={clientes}
    loading={loading}
    onExcluir={(cliente) => setClienteParaExcluir(cliente)}
    />

    {/* Modal de Confirmação de Exclusão */}
    <ConfirmModal
    isOpen={clienteParaExcluir !== null}
    title="Exclusão de Cliente"
    message={`Tem certeza que deseja excluir o cliente "${clienteParaExcluir?.nome || ''}"? Esta ação não poderá ser desfeita.`}
    confirmText="Sim, Excluir"
    cancelText="Cancelar"
    variant="danger"
    onConfirm={handleConfirmarExclusao}
    onClose={() => setClienteParaExcluir(null)}
    />
  </div>)
}
export default ClientesPage