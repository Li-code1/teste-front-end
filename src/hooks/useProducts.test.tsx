import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

describe('useProducts', () => {
  it('carrega os produtos da API sem usar o fallback', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ products: [{ productName: 'Phone', price: 100 }] }),
      }),
    );
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.usingFallback).toBe(false);
    expect(result.current.products).toHaveLength(1);
  });

  it('usa os dados de exemplo e sinaliza quando a API falha', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.usingFallback).toBe(true);
    expect(result.current.products.length).toBeGreaterThan(0);
  });
});
