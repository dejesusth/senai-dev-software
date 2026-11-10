import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { produtoService } from '../services/produtoservice'
import FotoUpload from '../components/Produtos/FotoUpload'
import './produto.css'

interface Props {
  onProdutoCriado: () => void
}

function ProdutoForm({ onProdutoCriado }: Props) {
  const { id } = useParams()
  const modoEdicao = !!id

  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState<number | string>(0)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  
  // ✨ Novo estado para a imagem em Base64
  const [fotoBase64Atual, setFotoBase64Atual] = useState<string | null>(null)

  // ✨ Carregar produto se estiver em modo de edição
  useEffect(() => {
    if (modoEdicao) {
      carregarProduto()
    }
  }, [id])

  async function carregarProduto() {
    if (!id) return
    try {
      const produto = await produtoService.buscarPorId(Number(id))
      if (produto) {
        setNome(produto.nome)
        setPreco(produto.preco.toString())
        setEstoque(produto.estoque)
        // ✨ Guardar a data URL que veio da API
        setFotoBase64Atual(produto.fotoBase64 ?? null)
      }
    } catch {
      setErro('Erro ao carregar dados do produto.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      const dados = {
        nome,
        preco: Number(preco),
        estoque: Number(estoque)
      }

      if (modoEdicao) {
        await produtoService.atualizar(Number(id), dados)
      } else {
        await produtoService.criar(dados)
      }

      if (!modoEdicao) {
        setNome('')
        setPreco('')
        setEstoque(0)
      }

      onProdutoCriado()
    } catch {
      setErro(modoEdicao ? 'Erro ao atualizar produto.' : 'Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="produto-container">
      <h2 className="produto-titulo">
        {modoEdicao ? 'Editar Produto' : 'Cadastrar Produto'}
      </h2>

      {erro && (
        <p style={{ color: '#dc2626', marginBottom: '12px', fontWeight: 500 }}>
          {erro}
        </p>
      )}

      <form className="produto-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            className="form-input"
            type="text"
            placeholder="Ex: Teclado Mecânico"
            value={nome}
            onChange={e => {
              if (erro) setErro(null)
              setNome(e.target.value)
            }}
            disabled={loading}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            id="preco"
            className="form-input"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={preco}
            onChange={e => {
              if (erro) setErro(null)
              setPreco(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estoque">Estoque (Qtd)</label>
          <input
            id="estoque"
            className="form-input"
            type="number"
            min="0"
            placeholder="0"
            value={estoque}
            onChange={e => {
              if (erro) setErro(null)
              setEstoque(e.target.value)
            }}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn-cadastrar" disabled={loading}>
          {loading ? 'Salvando...' : (modoEdicao ? 'Salvar Dados' : 'Cadastrar')}
        </button>
      </form>

      {/* ✨ Exibe o módulo de foto apenas no Modo Edição */}
      {modoEdicao && (
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #27272a' }}>
          <FotoUpload
            produtoId={Number(id)}
            fotoBase64Atual={fotoBase64Atual}
            onAtualizar={carregarProduto}
          />
        </div>
      )}
    </div>
  )
}

export default ProdutoForm