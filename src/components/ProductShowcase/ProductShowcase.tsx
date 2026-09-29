import { useRef, useState } from 'react';
import type { Product } from '../../types/product';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import ProductCard from './ProductCard';
import './ProductShowcase.scss';

interface ProductShowcaseProps {
  id?: string;
  title: string;
  products: Product[];
  loading: boolean;
  onSelectProduct: (product: Product) => void;
  /** Abas de filtro exibidas abaixo do título (primeira vitrine do layout). */
  tabs?: string[];
  /** Link "Ver todos" exibido abaixo do título (segunda vitrine do layout). */
  showSeeAll?: boolean;
}

export default function ProductShowcase({
  id,
  title,
  products,
  loading,
  onSelectProduct,
  tabs,
  showSeeAll,
}: ProductShowcaseProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeTab, setActiveTab] = useState(tabs?.[0] ?? '');
  const headingId = `${id ?? 'showcase'}-title`;

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id={id} className="showcase" aria-labelledby={headingId}>
      <h2 id={headingId} className="section-title">{title}</h2>

      {showSeeAll && (
        <a href="#" className="showcase__see-all">Ver todos</a>
      )}

      {tabs && (
        <div className="showcase__tabs" role="tablist" aria-label="Filtrar produtos por categoria">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`showcase__tab${activeTab === tab ? ' is-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="showcase__carousel">
        <button
          type="button"
          className="showcase__arrow showcase__arrow--prev"
          aria-label="Produtos anteriores"
          onClick={() => scrollByPage(-1)}
        >
          <ChevronLeftIcon width={16} height={16} />
        </button>

        {loading ? (
          <p className="showcase__status" role="status">Carregando produtos...</p>
        ) : (
          <ul className="showcase__track" ref={trackRef}>
            {products.map((product) => (
              <li key={product.id} className="showcase__slide">
                <ProductCard product={product} onSelect={onSelectProduct} />
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="showcase__arrow showcase__arrow--next"
          aria-label="Próximos produtos"
          onClick={() => scrollByPage(1)}
        >
          <ChevronRightIcon width={16} height={16} />
        </button>
      </div>
    </section>
  );
}
