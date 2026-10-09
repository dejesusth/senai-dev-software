export interface Venda {
  id: number
  data_venda: Date
  quantidade: number
  valor_total: number
  cliente_id: number
  produto_id: number
}

export type NovaVenda = Omit<Venda, 'id'>