interface Props {
  titulo: string
  valor: string
  icone?: string
  destaque?: boolean
}

function CardResumo({ titulo, valor, icone, destaque }: Props) {
  return (
    <div
      className="kpi-card"
      style={{
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        borderLeft: '5px solid var(--accent-amber)',
        borderTop: '1px solid var(--border-color)',
        borderRight: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        boxShadow: 'var(--shadow-card)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease'
      }}
    >
      <div 
        style={{ 
          fontSize: 13, 
          color: 'var(--text-secondary)', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center', 
          gap: 6 
        }}
      >
        <span>{icone}</span>
        <span>{titulo}</span>
      </div>
      <div 
        style={{ 
          fontSize: 26, 
          fontWeight: 800, 
          marginTop: 6, 
          color: destaque ? 'var(--accent-amber)' : 'var(--text-primary)', 
          letterSpacing: '-0.02em' 
        }}
      >
        {valor}
      </div>
    </div>
  )
}

export default CardResumo