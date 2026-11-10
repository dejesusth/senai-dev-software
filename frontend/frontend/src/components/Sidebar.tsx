import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LogoStockFlow from './LogoStockFlow'
import './sidebar.css'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="sidebar">
      {/* Topo / Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo-group">
          <div className="brand-icon-container">
            <LogoStockFlow size={32} />
          </div>

          <h1 className="brand-title">
            <span className="brand-stock">Stock</span>
            <span className="brand-flow">Flow</span>
          </h1>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/produtos" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span>Produtos</span>
        </NavLink>

        <NavLink 
          to="/clientes" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Clientes</span>
        </NavLink>

        <NavLink 
          to="/vendas" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span>Vendas</span>
        </NavLink>
      </nav>

      {/* Rodapé / Perfil */}
      <div className="sidebar-footer">
        <span className="user-info">{user?.nome || 'Admin SENAI'}</span>
        <button onClick={logout} className="logout-button">
          Sair
        </button>
      </div>
    </aside>
  )
}