import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import type { TopProduto } from '../../types/Dashboard'
import { painel } from '../../utils/Estilos'

interface TopProdutosProps {
  dados: TopProduto[]
}

function TopProdutos({ dados }: TopProdutosProps) {
  const listaDados = Array.isArray(dados) ? dados : []

  return (
    <div className="dashboard-card" style={painel}>
      <h3 className="dashboard-card-title">Mais Vendidos</h3>

      {listaDados.length === 0 ? (
        <p className="dashboard-empty">Sem vendas no período.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart 
            data={listaDados} 
            layout="vertical"
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            {/* Eixo X com números inteiros em tom neutro */}
            <XAxis 
              type="number" 
              allowDecimals={false} 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
            />
            
            {/* Eixo Y com nomes dos produtos */}
            <YAxis 
              type="category" 
              dataKey="nome" 
              width={110} 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
            />

            {/* Tooltip Charcoal padronizado */}
            <Tooltip
              formatter={(value) => [`${value} un.`, 'Quantidade']}
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

            {/* Barras em tom Âmbar com cantos arredondados na ponta */}
            <Bar 
              dataKey="quantidadeVendida" 
              name="Qtd." 
              fill="#d97706" 
              radius={[0, 6, 6, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default TopProdutos