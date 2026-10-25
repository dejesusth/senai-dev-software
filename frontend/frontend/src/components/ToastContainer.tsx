import React, { useState, useEffect } from 'react';
import type { ToastItem, ToastTipo } from '../types/Toast';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ mensagem: string; tipo: ToastTipo }>;
      const novoToast: ToastItem = {
        id: Date.now(),
        mensagem: customEvent.detail.mensagem,
        tipo: customEvent.detail.tipo || 'sucesso',
      };

      setToasts((prev) => [...prev, novoToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== novoToast.id));
      }, 3300);
    };

    window.addEventListener('stockflow-toast', handleToast);
    return () => window.removeEventListener('stockflow-toast', handleToast);
  }, []);

  return (
    <div id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.tipo}`}>
          {t.mensagem}
        </div>
      ))}
    </div>
  );
};