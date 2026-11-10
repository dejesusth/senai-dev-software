import { useState } from 'react';
import type { Produto } from '../types/Produto';
import ModalFoto from '../components/Produtos/ModalFoto';
import './produto.css';

interface Props {
  produtos: Produto[];
  loading: boolean;
  onExcluir?: (produto: Produto) => void;
}

function ProdutoList({ produtos, loading, onExcluir }: Props) {
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null);

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
                {/* ✨ Miniatura da Foto do Produto */}
                <div
                  onClick={() => p.fotoBase64 && setProdutoModal(p)}
                  style={{
                    cursor: p.fotoBase64 ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    width: '60px',
                    height: '60px',
                    flexShrink: 0
                  }}
                >
                  {p.fotoBase64 ? (
                    <>
                      <img
                        src={p.fotoBase64}
                        alt={p.nome}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10
                        }}
                      >
                        🔍
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#27272a',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#71717a'
                      }}
                    >
                      <span style={{ fontSize: 18 }}>📷</span>
                      <span style={{ fontSize: 9, marginTop: 2 }}>sem foto</span>
                    </div>
                  )}
                </div>

                {/* Informações do Produto */}
                <span className="font-medium text-gray-900">{p.nome}</span>

                <div>
                  <span
                    className={`produto-estoque ${
                      semEstoque ? 'zerado' : estoqueBaixo ? 'baixo' : ''
                    }`}
                  >
                    {semEstoque ? 'Sem estoque' : `Estoque: ${p.estoque}`}
                  </span>
                </div>

                <span className="font-semibold highlight-amber text-right">
                  {Number(p.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
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

      {/* ✨ Modal da Foto em Tamanho Real */}
      {produtoModal && (
        <ModalFoto
          produto={produtoModal}
          onClose={() => setProdutoModal(null)}
        />
      )}
    </div>
  );
}

export default ProdutoList;