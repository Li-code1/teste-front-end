import { lazy, Suspense, useCallback, useState } from 'react';
import type { Product } from './types/product';
import { useProducts } from './hooks/useProducts';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import ProductShowcase from './components/ProductShowcase/ProductShowcase';
import PartnerBanners from './components/PartnerBanners/PartnerBanners';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import ProductModal from './components/ProductModal/ProductModal';
import ApiNotice from './components/ApiNotice/ApiNotice';

// Sobreposição do layout do Figma: existe só em desenvolvimento e não entra no build.
// Só liga com `?layout` na URL (ex.: http://localhost:5173/?layout), para não deixar a tela
// "embaçada" por cima da página no uso normal.
const SHOW_OVERLAY =
  import.meta.env.DEV && new URLSearchParams(window.location.search).has('layout');

const LayoutOverlay = SHOW_OVERLAY
  ? lazy(() => import('./components/LayoutOverlay/LayoutOverlay'))
  : null;

const RELATED_TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos'];

export default function App() {
  const { products, loading, usingFallback } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const closeModal = useCallback(() => setSelectedProduct(null), []);

  return (
    <>
      <Header />
      <main>
        {usingFallback && <ApiNotice />}
        <Hero />
        <Categories />

        <ProductShowcase
          id="produtos"
          title="Produtos relacionados"
          tabs={RELATED_TABS}
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />

        <PartnerBanners />

        <ProductShowcase
          id="produtos-2"
          title="Produtos relacionados"
          showSeeAll
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />

        <PartnerBanners />

        <Brands />

        <ProductShowcase
          id="produtos-3"
          title="Produtos relacionados"
          showSeeAll
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />
      </main>

      <Newsletter />
      <Footer />

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}

      {LayoutOverlay && (
        <Suspense fallback={null}>
          <LayoutOverlay />
        </Suspense>
      )}
    </>
  );
}
