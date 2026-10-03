import { useEffect, useState } from 'react'
import { type Produto } from './types/produto.ts'
import { produtoService } from './services/produtoservice.ts'
import ProdutoForm from './components/produtoform.tsx'
import ProdutoList from './components/produtolist.tsx'

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
    <div>
      <h1>Gestão de Produtos</h1>
      <ProdutoForm onProdutoCriado={carregarProdutos} />
      <h2>Produtos Cadastrados</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ProdutoList produtos={produtos} loading={loading} />
    </div>
  )
}

export default App
