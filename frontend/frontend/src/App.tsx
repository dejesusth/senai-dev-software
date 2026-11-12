import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import ProdutosPage from './pages/ProdutosPage'
import ClientesPage from './pages/ClientesPage'
import VendasPage from './pages/VendasPage'
import { ToastContainer } from './components/ToastContainer'
import DashboardPage from './pages/DashboardPage'
import { ThemeProvider } from './context/ThemeContext'

function Layout() {
  const { isAuthenticated } = useAuth()
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      {isAuthenticated && <Sidebar />}
      <main style={{ flex: 1, padding: '24px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/produtos" element={
            <ProtectedRoute><ProdutosPage /></ProtectedRoute>
          } />
          <Route path="/clientes" element={
            <ProtectedRoute><ClientesPage /></ProtectedRoute>
          } />
          <Route path="/vendas" element={
            <ProtectedRoute><VendasPage /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App