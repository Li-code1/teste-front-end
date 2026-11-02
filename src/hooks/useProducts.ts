import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { fetchProducts } from '../services/productService';
import { fallbackProducts } from '../data/fallbackProducts';

interface UseProducts {
  products: Product[];
  loading: boolean;
  /** true quando a API falhou e estamos exibindo dados locais */
  usingFallback: boolean;
}

export function useProducts(): UseProducts {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((list) => setProducts(list))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('Não foi possível carregar a API, usando dados locais.', error);
        setProducts(fallbackProducts);
        setUsingFallback(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { products, loading, usingFallback };
}
