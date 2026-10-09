export interface Produto {
  id: number
  nome: string
  preco: number
  estoque: number;
}

export type NovoProduto = Omit<Produto, 'id'>