import { NavLink } from 'react-router-dom'

export default function Sidebar() {
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

  {/* Ícone de recolher (seta) à direita */}
  <span className="collapse-icon">⇇</span>
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
      </nav>
    </aside>
  )
}