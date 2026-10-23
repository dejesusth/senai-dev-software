import api from './api'
import type { Produto } from '../types/Produto.ts'

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const { data } = await api.get('/produto')
    return data
  },
  buscarPorId: async (id: number): Promise<Produto> => {
    const { data } = await api.get(`/produto/${id}`)
    return data
  },
  criar: async (body: Omit<Produto, 'id'>): Promise<Produto> => {
    const { data } = await api.post('/produto', body)
    return data
  }
}