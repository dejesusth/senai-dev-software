import type { Produto } from '../types/Produto';
import './produto.css';

interface Props {
  produtos: Produto[];
  loading: boolean;
  onExcluir?: (produto: Produto) => void;
}

function ProdutoList({ produtos, loading, onExcluir }: Props) {
  const listaProdutos = Array.isArray(produtos) ? produtos : [];

  return (
    <div className="card-box">
      <h2 className="card-title">Produtos Cadastrados</h2>

      {loading ? (
        <p className="text-muted">A carregar produtos...</p>
      ) : listaProdutos.length === 0 ? (
        <p className="text-muted">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="list-container">
          {listaProdutos.map((p) => {
            const semEstoque = p.estoque === 0;
            const estoqueBaixo = p.estoque < 5 && !semEstoque;

            return (
              <div key={p.id} className="item-row">
                <span className="font-medium text-gray-900">{p.nome}</span>

                <div>
                  <span className={`produto-estoque ${semEstoque ? 'zerado' : estoqueBaixo ? 'baixo' : ''}`}>
                    {semEstoque ? 'Sem estoque' : `Estoque: ${p.estoque}`}
                  </span>
                </div>

                <span className="font-semibold highlight-amber text-right">
                  {Number(p.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>

                <div className="item-actions">
                  {onExcluir && (
                    <button 
                      type="button" 
                      className="btn-excluir" 
                      onClick={() => onExcluir(p)}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProdutoList;