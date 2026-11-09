import { useEffect, useState } from 'react'
import { dashboardService } from '../services/DashboardService'
import type { DashboardResumo, VendasPorDia, TopProduto, UltimaVenda, ProdutoEstoqueBaixo } from '../types/Dashboard'
import { formatarMoeda } from '../utils/Formatadores'
import CardResumo from '../components/Dashboard/CardResumo'
import GraficoVendas from '../components/Dashboard/GraficoVendas'
import TopProdutos from '../components/Dashboard/TopProdutos'
import UltimasVendas from '../components/Dashboard/UltimasVendas'
import EstoqueBaixo from '../components/Dashboard/EstoqueBaixo'

function DashboardPage() {
  const [dias, setDias] = useState(30)
  const [resumo, setResumo] = useState<DashboardResumo | null>(null)
  const [vendasDia, setVendasDia] = useState<VendasPorDia[]>([])
  const [top, setTop] = useState<TopProduto[]>([])
  const [ultimas, setUltimas] = useState<UltimaVenda[]>([])
  const [estoque, setEstoque] = useState<ProdutoEstoqueBaixo[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true)
        setErro(null)
        const [r, v, t, u, e] = await Promise.all([
          dashboardService.resumo(dias),
          dashboardService.vendasPorDia(dias),
          dashboardService.topProdutos(dias, 5),
          dashboardService.ultimasVendas(5),
          dashboardService.estoqueBaixo(5)
        ])
        setResumo(r)
        setVendasDia(v)
        setTop(t)
        setUltimas(u)
        setEstoque(e)
      } catch {
        setErro('Erro ao carregar os dados do dashboard.')
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [dias])

  return (
    <div className={`page-container ${loading ? 'is-loading' : ''}`}>
      {/* Cabeçalho Limpo */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        
        <div className="dashboard-filter-box">
          <select 
            value={dias} 
            onChange={(e) => setDias(Number(e.target.value))}
            className="dashboard-select"
          >
            <option value={7}>Últimos 7 dias</option>
            <option value={15}>Últimos 15 dias</option>
            <option value={30}>Últimos 30 dias</option>
          </select>
        </div>
      </div>

      {erro && <div className="dashboard-error">{erro}</div>}
      {!resumo && loading && <p className="dashboard-loading-text">A carregar dados do dashboard...</p>}

      {/* Cards de KPI Limpos */}
      {resumo && (
        <div className="kpi-grid">
          <CardResumo 
            titulo="Faturamento" 
            valor={formatarMoeda(resumo.faturamento)} 
          />
          <CardResumo 
            titulo="Vendas" 
            valor={String(resumo.totalVendas)} 
          />
          <CardResumo 
            titulo="Ticket Médio" 
            valor={formatarMoeda(resumo.ticketMedio)} 
          />
          <CardResumo 
            titulo="Clientes Ativos" 
            valor={String(resumo.totalClientes)} 
          />
        </div>
      )}

      {/* Gráficos e Tabelas */}
      <div className="dashboard-grid-row">
        <GraficoVendas dados={vendasDia} />
        <TopProdutos dados={top} />
      </div>

      <div className="dashboard-grid-row">
        <UltimasVendas dados={ultimas} />
        <EstoqueBaixo dados={estoque} />
      </div>
    </div>
  )
}

export default DashboardPage