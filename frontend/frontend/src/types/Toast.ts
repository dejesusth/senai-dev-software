export type ToastTipo = 'sucesso' | 'erro' | 'alerta';

export interface ToastItem {
  id: number;
  mensagem: string;
  tipo: ToastTipo;
}