interface Props {
  titulo: string
  valor: string
  icone?: string
  destaque?: boolean
}

function CardResumo({ titulo, valor, icone }: Props) {
  return (
    <div
      className="kpi-card"
      style={{
        background: '#ffffff',
        color: '#111827',
        borderLeft: '5px solid #d97706',
        borderTop: '1px solid #e5e7eb',
        borderRight: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: 16,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div 
        style={{ 
          fontSize: 13, 
          color: '#4b5563', 
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
          color: '#111827', 
          letterSpacing: '-0.02em' 
        }}
      >
        {valor}
      </div>
    </div>
  )
}

export default CardResumo