import type { Cliente } from '../types/Cliente';
import './cliente.css';

interface Props {
  clientes: Cliente[];
  loading: boolean;
}

function ClienteList({ clientes, loading }: Props) {
  const listaClientes = Array.isArray(clientes) ? clientes : [];

  return (
    <div className="cliente-container">
      <h2 className="secao-titulo">Clientes Cadastrados</h2>

      {loading ? (
        <p className="cliente-vazio">A carregar clientes...</p>
      ) : listaClientes.length === 0 ? (
        <p className="cliente-vazio">Nenhum cliente cadastrado ainda.</p>
      ) : (
        <div className="cliente-grid">
          {listaClientes.map((c) => (
            <div key={c.id} className="cliente-card">
              <div className="cliente-header">
                <span className="cliente-nome">{c.nome}</span>
              </div>
              <div className="cliente-detalhes">
                <span className="cliente-email">📧 {c.email}</span>
                <span className="cliente-cpf">🪪 {c.cpf}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClienteList;