import { useEffect, useState } from 'react'
import type { Venda } from '../types/Venda.ts'
import { VendaService } from '../services/vendaService.ts'
import VendaForm from '../components/VendaForm.tsx'
import VendaList from '../components/VendaList.tsx'
import { mostrarToast } from '../services/toastService.ts'
import { ConfirmModal } from '../components/ConfirmModal.tsx'

function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(false)

  const [vendaParaExcluir, setVendaParaExcluir] = useState<Venda | null>(null)

const carregarVendas = async () => {
  setLoading(true)
  try {
    const dados = await VendaService.listar()
    
    // Se a API/Service retornar um objeto { data: [...] } ou undefined/null
    if (Array.isArray(dados)) {
      setVendas(dados)
    } else if (dados && Array.isArray((dados as any).data)) {
      setVendas((dados as any).data)
    } else {
      setVendas([]) // Fallback para lista vazia
    }
  } catch (error) {
    console.error("Erro ao carregar vendas:", error)
    mostrarToast('Erro ao carregar vendas.', 'erro')
    setVendas([])
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { carregarVendas() }, [])

  // Função chamada após registrar/atualizar uma venda
  const handleVendaCriada = () => {
    carregarVendas()
    mostrarToast('Venda registrada com sucesso!', 'sucesso')
  }

  // Função executada ao confirmar a exclusão no Modal
  const handleConfirmarExclusao = async () => {
    if (!vendaParaExcluir) return

    try {
      if (VendaService.deletar) {
        await VendaService.deletar(vendaParaExcluir.id)
      }
      mostrarToast('Venda excluída com sucesso!', 'sucesso')
      carregarVendas()
    } catch {
      mostrarToast('Erro ao tentar excluir a venda.', 'erro')
    } finally {
      setVendaParaExcluir(null)
    }
  }

  return (
  <div>
    <h1>Gestão de Vendas</h1>
    <VendaForm onVendaCriada={handleVendaCriada} />
    
    <VendaList
    vendas={vendas}
    loading={loading} 
    onExcluir={(venda) => setVendaParaExcluir(venda)}
    />

    {/* Modal de Confirmação de Exclusão */}
    <ConfirmModal
    isOpen={vendaParaExcluir !== null}
    title="Excluir Venda"
    message={`Tem certeza que deseja excluir o registro da venda #${vendaParaExcluir?.id || ''}? Esta ação não poderá ser desfeita. `}
    confirmText="Sim, Excluir"
    cancelText="Cancelar"
    variant="danger"
    onConfirm={handleConfirmarExclusao}
    onClose={() => setVendaParaExcluir(null)}
    />
  </div>)
}
export default VendasPage