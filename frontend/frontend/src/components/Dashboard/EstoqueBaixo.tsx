import type { ProdutoEstoqueBaixo } from '../../types/Dashboard'
import { painel } from '../../utils/Estilos'

interface EstoqueBaixoProps {
  dados: ProdutoEstoqueBaixo[]
}

function EstoqueBaixo({ dados }: EstoqueBaixoProps) {
  const lista = Array.isArray(dados) ? dados : []

  return (
    <div className="dashboard-card" style={painel}>
      <h3 className="dashboard-card-title">⚠️ Estoque Baixo</h3>

      {lista.length === 0 ? (
        <div className="estoque-ok-box">
          <span className="estoque-ok-icon">✅</span>
          <p className="estoque-ok-texto">Todos os produtos com estoque suficiente.</p>
        </div>
      ) : (
        <ul className="estoque-lista">
          {lista.map((p) => {
            const esgotado = p.estoque === 0

            return (
              <li 
                key={p.id} 
                className={`estoque-item ${esgotado ? 'item-esgotado' : ''}`}
              >
                <span className="estoque-nome">{p.nome}</span>
                <strong
                  className="estoque-badge"
                  style={{
                    color: esgotado ? '#ef4444' : '#d97706',
                    backgroundColor: esgotado ? '#fef2f2' : '#fef3c7',
                    borderColor: esgotado ? '#fca5a5' : '#fcd34d'
                  }}
                >
                  {esgotado ? 'ESGOTADO' : `${p.estoque} un.`}
                </strong>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default EstoqueBaixo