import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchProducts, normalize, toNumber } from './productService';

describe('toNumber', () => {
  it('mantém números como estão', () => {
    expect(toNumber(1499.9)).toBe(1499.9);
  });

  it('converte texto no formato brasileiro', () => {
    expect(toNumber('R$ 1.499,90')).toBe(1499.9);
  });

  it('converte texto com ponto decimal', () => {
    expect(toNumber('1499.90')).toBe(1499.9);
  });

  it('devolve zero para valores inválidos', () => {
    expect(toNumber('abc')).toBe(0);
    expect(toNumber(undefined)).toBe(0);
  });
});

describe('normalize', () => {
  it('converte o formato da API para o tipo Product', () => {
    const produto = normalize(
      { productName: 'Phone', descriptionShort: 'Desc', photo: 'a.png', price: 100 },
      0,
    );
    expect(produto).toEqual({
      id: 1, name: 'Phone', description: 'Desc', photo: 'a.png', price: 100,
    });
  });

  it('usa valores padrão quando faltam campos', () => {
    expect(normalize({}, 4)).toEqual({
      id: 5, name: 'Produto', description: '', photo: '', price: 0,
    });
  });
});

describe('fetchProducts', () => {
  const respond = (body: unknown, ok = true, status = 200) =>
    vi.fn().mockResolvedValue({ ok, status, json: async () => body });

  afterEach(() => vi.unstubAllGlobals());

  it('chama o caminho local /api/produtos (proxy), não a URL da API', async () => {
    const fetchMock = respond({ products: [] });
    vi.stubGlobal('fetch', fetchMock);
    await fetchProducts();
    expect(fetchMock.mock.calls[0][0]).toBe('/api/produtos');
  });

  it('aceita um objeto com a chave products', async () => {
    vi.stubGlobal('fetch', respond({ products: [{ productName: 'A', price: 10 }] }));
    const lista = await fetchProducts();
    expect(lista).toHaveLength(1);
    expect(lista[0]).toMatchObject({ id: 1, name: 'A', price: 10 });
  });

  it('aceita uma lista direta', async () => {
    vi.stubGlobal('fetch', respond([{ productName: 'A' }, { productName: 'B' }]));
    expect(await fetchProducts()).toHaveLength(2);
  });

  it('lança erro quando a resposta não é ok', async () => {
    vi.stubGlobal('fetch', respond({}, false, 500));
    await expect(fetchProducts()).rejects.toThrow('HTTP 500');
  });
});
