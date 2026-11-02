import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductShowcase from './ProductShowcase';
import type { Product } from '../../types/product';

const produtos: Product[] = [
  { id: 1, name: 'A', description: '', photo: '', price: 10 },
  { id: 2, name: 'B', description: '', photo: '', price: 20 },
];

const props = { title: 'Produtos relacionados', onSelectProduct: () => {} };

describe('ProductShowcase', () => {
  it('mostra um cartão por produto', () => {
    render(<ProductShowcase {...props} products={produtos} loading={false} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('mostra o estado de carregamento', () => {
    render(<ProductShowcase {...props} products={[]} loading />);
    expect(screen.getByRole('status').textContent).toContain('Carregando');
  });

  it('as abas são botões alternáveis e só uma fica pressionada', () => {
    render(
      <ProductShowcase {...props} products={produtos} loading={false} tabs={['Celular', 'Tablets']} />,
    );
    const celular = screen.getByRole('button', { name: 'Celular' });
    const tablets = screen.getByRole('button', { name: 'Tablets' });
    expect(celular.getAttribute('aria-pressed')).toBe('true');
    expect(tablets.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(tablets);
    expect(celular.getAttribute('aria-pressed')).toBe('false');
    expect(tablets.getAttribute('aria-pressed')).toBe('true');
  });
});
