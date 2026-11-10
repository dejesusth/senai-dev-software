import { useState } from 'react'
import { produtoService } from '../../services/produtoservice'

interface Props {
  produtoId: number
  fotoBase64Atual?: string | null
  onAtualizar: () => void
}

export default function FotoUpload({ produtoId, fotoBase64Atual, onAtualizar }: Props) {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // Selecionar ficheiro local
  function handleSelecionar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setErro(null)
    setArquivo(file)
    setPreview(URL.createObjectURL(file))
  }

  // Enviar a nova foto para a API
  async function handleSalvar() {
    if (!arquivo) return
    try {
      setCarregando(true)
      setErro(null)
      await produtoService.uploadFoto(produtoId, arquivo)
      setArquivo(null)
      setPreview(null)
      onAtualizar()
    } catch {
      setErro('Erro ao enviar a imagem. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  // Remover a foto existente
  async function handleRemover() {
    try {
      setCarregando(true)
      setErro(null)
      await produtoService.removerFoto(produtoId)
      setArquivo(null)
      setPreview(null)
      onAtualizar()
    } catch {
      setErro('Erro ao remover a imagem.')
    } finally {
      setCarregando(false)
    }
  }

  const imgSrc = preview ?? fotoBase64Atual ?? null

  return (
    <div style={{
      border: '1px solid #27272a',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '16px',
      backgroundColor: '#18181b'
    }}>
      <h4 style={{ margin: '0 0 12px', color: '#fafafa', fontSize: '1rem' }}>
        Foto do produto
      </h4>

      {erro && (
        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '10px' }}>
          {erro}
        </p>
      )}

      {imgSrc ? (
        <div style={{ marginBottom: '12px' }}>
          <img
            src={imgSrc}
            alt="Foto do produto"
            style={{
              maxWidth: '100%',
              maxHeight: '180px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: '1px solid #3f3f46'
            }}
          />
        </div>
      ) : (
        <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '12px' }}>
          Nenhuma foto cadastrada.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleSelecionar}
          disabled={carregando}
          style={{ color: '#a1a1aa', fontSize: '0.85rem' }}
        />

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          {arquivo && (
            <button
              type="button"
              onClick={handleSalvar}
              disabled={carregando}
              style={{
                backgroundColor: '#d97706',
                color: '#ffffff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {carregando ? 'Salvando...' : '💾 Salvar foto'}
            </button>
          )}

          {fotoBase64Atual && !arquivo && (
            <button
              type="button"
              onClick={handleRemover}
              disabled={carregando}
              style={{
                backgroundColor: 'transparent',
                color: '#ef4444',
                border: '1px solid #7f1d1d',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {carregando ? 'Removendo...' : '🗑️ Remover foto'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}