import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/authService'
import '../components/Login.css'
import { mostrarToast } from '../services/toastService'

function LoginPage() {
  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState<string | null>(null)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redireciona se já estiver autenticado
  if (isAuthenticated) return <Navigate to="/produtos" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    try {
      setLoading(true)
      const resp = await authService.login({ email, senha })
      login(resp)
      mostrarToast('Login realizado com sucesso!', 'sucesso')
      navigate('/produtos')
    } catch {
      const mensagemErro = 'E-mail ou senha incorretos.'
      setErro(mensagemErro)
      mostrarToast(mensagemErro, 'erro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🔐</span>
          <h2>Acessar Conta</h2>
          <p>Digite suas credenciais para continuar</p>
        </div>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder=""
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage