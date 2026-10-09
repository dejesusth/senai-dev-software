import { useEffect, useState } from 'react'
import type { Venda } from '../types/Venda.ts'
import { VendaService } from '../services/VendaService.ts'
import VendaForm from '../components/VendaForm.tsx'
import VendaList from '../components/VendaList.tsx'


function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(false)

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
    setVendas([])
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { carregarVendas() }, [])
  return (<div>
    <h1>Gestão de Vendas</h1>
    <VendaForm onVendaCriada={carregarVendas} />
    <VendaList vendas={vendas} loading={loading} />
  </div>)
}
export default VendasPage