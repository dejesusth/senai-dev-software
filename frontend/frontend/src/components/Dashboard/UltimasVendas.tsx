import type { UltimaVenda } from '../../types/Dashboard'
import { formatarMoeda, formatarDataHora } from '../../utils/Formatadores'
import { painel } from '../../utils/Estilos'

interface UltimasVendasProps {
  dados: UltimaVenda[]
}

function UltimasVendas({ dados }: UltimasVendasProps) {
  const lista = Array.isArray(dados) ? dados : []

  return (
    <div className="dashboard-card" style={painel}>
      <h3 className="dashboard-card-title">🧾 Últimas Vendas</h3>

      {lista.length === 0 ? (
        <p className="dashboard-empty">Nenhuma venda registrada recentemente.</p>
      ) : (
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th className="text-right">Qtd.</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((v) => (
                <tr key={v.id}>
                  <td className="text-muted">{formatarDataHora(v.dataVenda)}</td>
                  <td className="font-medium">{v.cliente || '—'}</td>
                  <td>{v.produto || '—'}</td>
                  <td className="text-right">{v.quantidade}</td>
                  <td className="text-right font-semibold highlight-amber">
                    {formatarMoeda(v.valorTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UltimasVendas