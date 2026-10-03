import { useEffect, useState } from 'react'
import type { Produto } from './types/Produto'
import { produtoService } from './services/produtoservice.ts'
import ProdutoForm from './components/produtoform.tsx'
import ProdutoList from './components/produtolist.tsx'
import './components/produto.css'

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading,  setLoading]  = useState(false)
  const [erro,     setErro]     = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      const dados = await produtoService.listar()
      setProdutos(dados)
    } catch {
      setErro('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <div className="app-container">
      {/* Título Principal */}
      <h1 className="app-titulo">Gestão de Produtos</h1>

      {/* Grid de Layout Lado a Lado */}
      <main className="app-layout">
        {/* Coluna 1: Formulário de Cadastro */}
        <ProdutoForm onProdutoCriado={carregarProdutos} />

        {/* Coluna 2: Título da Seção e Lista de Produtos */}
        <div className="lista-coluna">
          <h2 className="secao-titulo">Produtos Cadastrados</h2>

          {erro && (
            <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
              {erro}
            </p>
          )}

          <ProdutoList produtos={produtos} loading={loading} />
        </div>
      </main>
    </div>
  )
}

export default App