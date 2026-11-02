import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const resposta = (products: unknown[]) =>
  vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ products }) });

describe('App', () => {
  it('abre o modal com os dados do produto clicado', async () => {
    vi.stubGlobal('fetch', resposta([{ productName: 'IPHONE 13 MINI 1', descriptionShort: 'Desc', price: 9000 }]));
    render(<App />);

    const [abrir] = await screen.findAllByRole('button', { name: 'IPHONE 13 MINI 1' });
    fireEvent.click(abrir);

    const modal = screen.getByRole('dialog', { name: 'IPHONE 13 MINI 1' });
    expect(modal.textContent).toContain('R$ 9.000,00');
    fireEvent.click(screen.getByLabelText('Fechar'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('não mostra aviso quando a API responde', async () => {
    vi.stubGlobal('fetch', resposta([{ productName: 'A', price: 1 }]));
    render(<App />);
    await screen.findAllByRole('button', { name: 'A' });
    expect(screen.queryByText(/produtos de exemplo/)).toBeNull();
  });

  it('avisa que são produtos de exemplo quando a API falha', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    render(<App />);
    expect(await screen.findByText(/Exibindo produtos de exemplo/)).toBeTruthy();
  });
});
