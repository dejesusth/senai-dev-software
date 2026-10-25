import type { ToastTipo } from '../types/Toast';

export const mostrarToast = (mensagem: string, tipo: ToastTipo = 'sucesso') => {
  const event = new CustomEvent('stockflow-toast', {
    detail: { mensagem, tipo },
  });
  window.dispatchEvent(event);
};