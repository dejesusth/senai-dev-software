import { useEffect, useState } from 'react'
import type { Produto } from '../types/Produto'
import { produtoService } from '../services/produtoservice.ts'
import ProdutoForm from '../components/produtoform.tsx'
import ProdutoList from '../components/produtolist.tsx'
import { mostrarToast } from '../services/toastService.ts'
import { ConfirmModal } from '../components/ConfirmModal'

function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setProdutos(await produtoService.listar())
    } catch {
      const mensagemErro = 'Erro ao carregar produtos.'
      setErro(mensagemErro)
      mostrarToast(mensagemErro, 'erro')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregarProdutos() }, [])

  const handleProdutoCriado = () => {
    carregarProdutos()
    mostrarToast('Produto salvo com sucesso!', 'sucesso')
  }

  const handleConfirmarExclusao = async () => {
    if (!produtoParaExcluir) return

    try {
      await produtoService.deletar(produtoParaExcluir.id)
      mostrarToast('Produto excluído com sucesso!', 'sucesso')
      carregarProdutos()
    } catch {
      mostrarToast('Erro ao tentar excluir o produto.', 'erro')
    } finally {
      setProdutoParaExcluir(null)
    }
  }

  return (
  <div>
    <h1>Gestão de Produtos</h1>
    <ProdutoForm onProdutoCriado={handleProdutoCriado} />
    {erro && <p>{erro}</p>}

    <ProdutoList
    produtos={produtos}
    loading={loading}
    onExcluir={(produto) => setProdutoParaExcluir(produto)}
    />

    {/* Modal de Confirmação de Exclusão */}
    <ConfirmModal
    isOpen={produtoParaExcluir !== null}
    title="Excluir Produto"
    message={`Tem certeza que deseja excluir o produto "${produtoParaExcluir?.nome || ''}"? Esta ação não poderá ser desfeita.`}
    confirmText="Sim, Excluir"
    cancelText="Cancelar"
    variant="danger"
    onConfirm={handleConfirmarExclusao}
    onClose={() => setProdutoParaExcluir(null)}
    />
  </div>
  )
}
export default ProdutosPage