import type { Produto } from '../types/Produto';
import './produto.css';

interface Props {
  produtos: Produto[];
  loading: boolean;
}

function ProdutoList({ produtos, loading }: Props) {
  const listaProdutos = Array.isArray(produtos) ? produtos : [];

  return (
    <div className="produto-container">
      <h2 className="secao-titulo">Produtos Cadastrados</h2>

      {loading ? (
        <p className="produto-vazio">Carregando...</p>
      ) : listaProdutos.length === 0 ? (
        <p className="produto-vazio">Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul className="produto-lista">
          {listaProdutos.map((p) => (
            <li key={p.id} className="produto-item">
              <span className="produto-nome">{p.nome}</span>
              <div className="produto-info">
                <span className="produto-estoque">
                  Estoque: {p.estoque ?? 0}
                </span>
                <span className="produto-preco">
                {Number(p.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProdutoList;