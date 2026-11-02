import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

/** O layout exibe preço "de" riscado e parcelamento; ambos são derivados do preço da API. */
const OLD_PRICE_FACTOR = 1.1;
const INSTALLMENTS = 2;

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const oldPrice = product.price * OLD_PRICE_FACTOR;
  const installment = product.price / INSTALLMENTS;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__open"
        onClick={() => onSelect(product)}
      >
        {/* Imagem decorativa: o nome do botão vem do texto abaixo, sem repetir */}
        <img
          className="product-card__image"
          src={product.photo}
          alt=""
          loading="lazy"
          width={279}
          height={228}
        />
        <span className="product-card__name">{product.name}</span>
      </button>

      <p className="product-card__old-price">
        <span className="visually-hidden">De </span>
        <s>{formatPrice(oldPrice)}</s>
      </p>
      <p className="product-card__price">{formatPrice(product.price)}</p>
      <p className="product-card__installments">
        ou {INSTALLMENTS}x de {formatPrice(installment)} sem juros
      </p>
      <p className="product-card__shipping">Frete grátis</p>

      <button
        type="button"
        className="product-card__buy"
        aria-label={`Comprar ${product.name}`}
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  );
}
