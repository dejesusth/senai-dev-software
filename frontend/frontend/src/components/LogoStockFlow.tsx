export function LogoStockFlow({ size = 32 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Caixa Superior */}
      <path d="M32 8L52 18L32 28L12 18L32 8Z" fill="#3f3f46" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 18L32 28V42L12 32V18Z" fill="#18181b" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M32 28L52 18V32L32 42V28Z" fill="#27272a" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>
      
      {/* Detalhe da Fita Âmbar */}
      <path d="M25 11.5 L39 18.5 L32 22 L18 15 Z" fill="#d97706" />

      {/* Caixa Inferior */}
      <path d="M32 24L52 34L32 44L12 34L32 24Z" fill="#52525b" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 34L32 44V56L12 46V34Z" fill="#27272a" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M32 44L52 34V46L32 56V44Z" fill="#3f3f46" stroke="#18181b" strokeWidth="2" strokeLinejoin="round"/>

      {/* Seta Envolvente Âmbar */}
      <path 
        d="M8 44 C8 24 26 14 52 14" 
        stroke="#d97706" 
        strokeWidth="5" 
        strokeLinecap="round" 
      />
      <path 
        d="M44 8 L54 14 L44 20" 
        fill="none" 
        stroke="#d97706" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  )
}

export default LogoStockFlow