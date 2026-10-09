export interface Venda {
  id: number
  dataVenda: Date
  quantidade: number
  valorTotal: number
  clienteId: number
  produtoId: number
}

export type NovaVenda = Omit<Venda, 'id'>