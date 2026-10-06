import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>StockFlow</h1>
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
      </nav>
    </aside>
  )
}