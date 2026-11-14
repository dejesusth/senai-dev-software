import type { Venda } from '../types/Venda'

interface Props {
  vendas: Venda[]
  loading: boolean
  onExcluir?: (venda: Venda) => void
}

type VendaDetalhada = Venda & {
  produtoId?: number
  clienteId?: number
  nomeProduto?: string
  nomeCliente?: string
}

function VendaList({ vendas, loading, onExcluir }: Props) {
  const listaVendas = Array.isArray(vendas) ? (vendas as VendaDetalhada[]) : []

  return (
    <div className="card-box">
      <h2 className="card-title">Vendas Cadastradas</h2>

      {loading ? (
        <p className="text-muted">Carregando vendas...</p>
      ) : listaVendas.length === 0 ? (
        <p className="text-muted">Nenhuma venda cadastrada ainda.</p>
      ) : (
        <div className="list-container">
          {listaVendas.map((v) => {
            const nomeProduto =
              v.nomeProduto ||
              (v.produtoId ? `Produto #${v.produtoId}` : `Venda #${v.id}`)

            const nomeCliente =
              v.nomeCliente ||
              (v.clienteId ? `Cliente #${v.clienteId}` : null)

            const dataFormatada = v.dataVenda
              ? new Date(v.dataVenda).toLocaleDateString('pt-BR')
              : 'Sem data'

            const valorFormatado = Number(v?.valorTotal ?? 0).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })

            return (
              <div key={v.id} className="item-row">
                {/* Coluna 1: Identificação do Produto e Cliente */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                  <span
                    className="font-semibold"
                    style={{
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {nomeProduto}
                  </span>
                  {nomeCliente && (
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Cliente: {nomeCliente}
                    </span>
                  )}
                </div>

                {/* Coluna 2: Data e Badge de Quantidade */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {dataFormatada}
                  </span>
                  <span className="badge-cpf">
                    {v.quantidade} {v.quantidade === 1 ? 'un.' : 'uns.'}
                  </span>
                </div>

                {/* Coluna 3: Valor Total em Real e Âmbar */}
                <span className="font-semibold highlight-amber text-right" style={{ fontSize: '1rem' }}>
                  {valorFormatado}
                </span>

                {/* Coluna 4: Ação */}
                <div className="item-actions">
                  {onExcluir && (
                    <button
                      type="button"
                      className="btn-excluir"
                      onClick={() => onExcluir(v)}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default VendaList