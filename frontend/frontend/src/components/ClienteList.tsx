import type { Cliente } from '../types/Cliente';
import './cliente.css';

interface Props {
  clientes: Cliente[];
  loading: boolean;
}

function ClienteList({ clientes, loading }: Props) {
  const listaClientes = Array.isArray(clientes) ? clientes : [];

  return (
    <div className="cliente-card-box">
      <h2 className="secao-titulo-cliente">Clientes Cadastrados</h2>

      {loading ? (
        <p className="cliente-vazio">A carregar...</p>
      ) : listaClientes.length === 0 ? (
        <p className="cliente-vazio">Nenhum cliente cadastrado ainda.</p>
      ) : (
        <ul className="cliente-lista">
          {listaClientes.map((c) => (
            <li key={c.id} className="cliente-item">
              <span className="cliente-nome">{c.nome}</span>
              <div className="cliente-info">
                <span className="cliente-email">{c.email}</span>
                <span className="cliente-divisor">•</span>
                <span className="cliente-cpf">{c.cpf}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClienteList;