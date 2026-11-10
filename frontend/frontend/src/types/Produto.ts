export interface Produto {
  id: number
  nome: string
  preco: number
  estoque: number;
  fotoBase64?: string
}

export type NovoProduto = Omit<Produto, 'id'>