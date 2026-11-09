import type { Cliente } from '../types/Cliente';
import './cliente.css';

interface Props {
  clientes: Cliente[];
  loading: boolean;
  onExcluir?: (cliente: Cliente) => void;
}

function ClienteList({ clientes, loading, onExcluir }: Props) {
  const listaClientes = Array.isArray(clientes) ? clientes : [];

  return (
    <div className="card-box">
      <h2 className="card-title">Clientes Cadastrados</h2>

      {loading ? (
        <p className="text-muted">A carregar clientes...</p>
      ) : listaClientes.length === 0 ? (
        <p className="text-muted">Nenhum cliente cadastrado ainda.</p>
      ) : (
        <div className="list-container">
          {listaClientes.map((c) => (
            <div key={c.id} className="item-row">
              <span className="font-medium text-gray-900">{c.nome}</span>
              <span className="text-muted">{c.email}</span>
              <div>
                <span className="badge-cpf">{c.cpf}</span>
              </div>

              <div className="item-actions">
                {onExcluir && (
                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={() => onExcluir(c)}
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClienteList;