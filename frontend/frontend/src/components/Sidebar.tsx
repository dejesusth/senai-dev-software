import { NavLink } from 'react-router-dom'
import { useAuth} from '../context/AuthContext'
import './sidebar.css'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="sidebar">
      <h1><div className="sidebar-brand">
  <div className="brand-logo-group">
    {/* Caixa branca com a sua imagem JPG */}
    <div className="brand-icon-container">
<img src="/logo.jpg" alt="StockFlow Logo" className="brand-icon-image" />    </div>

    {/* Nome divido para podermos dar cores diferentes */}
    <h1 className="brand-title">
      <span className="brand-stock">Stock</span>
      <span className="brand-flow">Flow</span>
    </h1>
  </div>

</div></h1>
      <nav>
        <NavLink 
          to="/produtos" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          📦 Produtos
        </NavLink>

        <NavLink 
          to="/clientes" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          👤 Clientes
        </NavLink>

        <NavLink 
          to="/vendas" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          💵 Vendas
        </NavLink>
      </nav>
      
<div style={{ padding: '20px', color: 'white', fontSize: '13px' }}>
  <p>👤 {user?.nome}</p>
  <button onClick={logout}>🚪 Sair</button>
</div>

    </aside>
  )
}