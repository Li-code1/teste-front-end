import { useEffect, useRef, useState } from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons';
import './ProductModal.scss';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fecha com ESC, trava o scroll do fundo e devolve o foco ao fechar.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(99, q + 1));

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal__close" aria-label="Fechar" onClick={onClose}>
          <CloseIcon width={22} height={22} />
        </button>

        <div className="modal__media">
          <img src={product.photo} alt={product.name} />
        </div>

        <div className="modal__info">
          <h2 id="modal-title" className="modal__title">{product.name}</h2>
          <p className="modal__price">{formatPrice(product.price)}</p>
          <p className="modal__description">{product.description}</p>
          <a href="#" className="modal__details">Veja mais detalhes do produto &gt;</a>

          <div className="modal__actions">
            <div className="modal__quantity" role="group" aria-label="Quantidade">
              <button type="button" onClick={decrease} aria-label="Diminuir quantidade" disabled={quantity === 1}>
                <MinusIcon width={20} height={20} />
              </button>
              <output aria-live="polite">{String(quantity).padStart(2, '0')}</output>
              <button type="button" onClick={increase} aria-label="Aumentar quantidade">
                <PlusIcon width={20} height={20} />
              </button>
            </div>
            <button type="button" className="modal__buy" onClick={onClose}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
