import api from './api'
import type { Venda, NovaVenda } from '../types/Venda.ts'

export const VendaService = {
  listar: async (): Promise<Venda[]> => {
    const { data } = await api.get('/venda')
    return data
  },
  
  criar: async (c: NovaVenda): Promise<Venda> => {
    const { data } = await api.post('/venda', c)
    return data
  }
}