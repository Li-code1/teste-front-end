import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../../types/product';

const produto: Product = {
  id: 1, name: 'Phone', description: 'Desc', photo: 'a.png', price: 1000,
};

describe('ProductCard', () => {
  it('mostra preço atual, preço riscado derivado e parcelas', () => {
    render(<ProductCard product={produto} onSelect={() => {}} />);
    expect(screen.getByText('R$ 1.000,00')).toBeTruthy();
    expect(screen.getByText('R$ 1.100,00')).toBeTruthy(); // +10%
    expect(screen.getByText('ou 2x de R$ 500,00 sem juros')).toBeTruthy();
  });

  it('o botão de abrir tem o nome do produto uma única vez (imagem decorativa)', () => {
    render(<ProductCard product={produto} onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: 'Phone' })).toBeTruthy();
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('chama onSelect com o produto ao clicar no card e em Comprar', () => {
    const onSelect = vi.fn();
    render(<ProductCard product={produto} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Phone' }));
    fireEvent.click(screen.getByRole('button', { name: 'Comprar Phone' }));
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(produto);
  });
});
