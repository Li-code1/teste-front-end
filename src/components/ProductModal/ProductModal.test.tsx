import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductModal from './ProductModal';
import type { Product } from '../../types/product';

const produto: Product = {
  id: 1, name: 'Phone', description: 'Desc', photo: 'a.png', price: 1499.9,
};

describe('ProductModal', () => {
  it('mostra nome, preço e descrição do produto', () => {
    render(<ProductModal product={produto} onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: 'Phone' })).toBeTruthy();
    expect(screen.getByText('R$ 1.499,90')).toBeTruthy();
    expect(screen.getByText('Desc')).toBeTruthy();
  });

  it('fecha ao pressionar ESC', () => {
    const onClose = vi.fn();
    render(<ProductModal product={produto} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('fecha ao clicar no X e ao clicar fora, mas não ao clicar dentro', () => {
    const onClose = vi.fn();
    const { container } = render(<ProductModal product={produto} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('.modal') as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('aumenta a quantidade ao clicar no botão de mais', () => {
    render(<ProductModal product={produto} onClose={() => {}} />);
    fireEvent.click(screen.getByLabelText('Aumentar quantidade'));
    expect(screen.getByRole('status').textContent).toBe('02');
  });

  it('não diminui a quantidade abaixo de 1', () => {
    render(<ProductModal product={produto} onClose={() => {}} />);
    expect(screen.getByLabelText('Diminuir quantidade')).toHaveProperty('disabled', true);
  });

  it('leva o foco para dentro ao abrir e o devolve ao fechar', () => {
    const origem = document.createElement('button');
    document.body.appendChild(origem);
    origem.focus();

    const { unmount } = render(<ProductModal product={produto} onClose={() => {}} />);
    expect(document.activeElement).toBe(screen.getByLabelText('Fechar'));

    unmount();
    expect(document.activeElement).toBe(origem);
    origem.remove();
  });

  it('mantém o foco dentro do modal ao apertar Tab no último e Shift+Tab no primeiro', () => {
    render(<ProductModal product={produto} onClose={() => {}} />);
    const fechar = screen.getByLabelText('Fechar');
    const comprar = screen.getByRole('button', { name: 'Comprar' });

    comprar.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(fechar);

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(comprar);
  });

  it('confirma a compra sem fechar o modal', () => {
    const onClose = vi.fn();
    render(<ProductModal product={produto} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Aumentar quantidade'));
    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));

    expect(screen.getByText('2 itens adicionados ao carrinho.')).toBeTruthy();
    expect(onClose).not.toHaveBeenCalled();
  });
});
