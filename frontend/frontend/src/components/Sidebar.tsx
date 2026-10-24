import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './sidebar.css'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo-group">
          <div className="brand-icon-container">
            <img src="/logo.jpg" alt="StockFlow Logo" className="brand-icon-image" />
          </div>

          <h1 className="brand-title">
            <span className="brand-stock">Stock</span>
            <span className="brand-flow">Flow</span>
          </h1>
        </div>
      </div>

      <nav className="sidebar-nav">
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
      
      <div className="sidebar-footer">
        <p className="user-info">  {user?.nome || 'Usuário'}</p>
        <button onClick={logout} className="logout-button">
            Sair
        </button>
      </div>
    </aside>
  )
}