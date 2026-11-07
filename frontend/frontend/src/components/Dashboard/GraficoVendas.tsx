import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { VendasPorDia } from '../../types/Dashboard'
import { formatarMoeda, formatarDiaMes } from '../../utils/Formatadores'
import { painel } from '../../utils/Estilos'

interface Props { 
  dados: VendasPorDia[] 
}

function GraficoVendas({ dados }: Props) {
  const listaDados = Array.isArray(dados) ? dados : []

  return (
    <div className="dashboard-card" style={painel}>
      <h3 className="dashboard-card-title">📈 Faturamento por Dia</h3>
      
      {listaDados.length === 0 ? (
        <p className="dashboard-empty">Sem dados de vendas no período selecionado.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={listaDados} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            {/* Grelha sutil em cinza suave */}
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            
            {/* Eixo X estilizado */}
            <XAxis 
              dataKey="data" 
              tickFormatter={formatarDiaMes} 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
            />
            
            {/* Eixo Y estilizado */}
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
            />
            
            {/* Tooltip estilizado em Charcoal com valor em Âmbar */}
            <Tooltip
              labelFormatter={(l) => formatarDiaMes(String(l))}
              formatter={(v) => [formatarMoeda(Number(v)), 'Faturamento']}
              contentStyle={{
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: 'none',
                color: '#f9fafb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#f59e0b', fontWeight: 600 }}
              labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
            />
            
            {/* Linha principal em tom Âmbar com pontos destacados */}
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#d97706" 
              strokeWidth={3}
              dot={{ fill: '#d97706', r: 3 }}
              activeDot={{ r: 6, fill: '#f59e0b', stroke: '#1f2937', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default GraficoVendas