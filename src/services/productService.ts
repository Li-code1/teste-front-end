import type { Product } from '../types/product';

export const PRODUCTS_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

/**
 * Em desenvolvimento, a API do teste bloqueia o navegador por CORS.
 * O Vite faz o proxy de '/api/produtos' (ver vite.config.ts), então o
 * navegador conversa só com o localhost. Em produção usamos a URL direta.
 */
const REQUEST_URL = import.meta.env.DEV ? '/api/produtos' : PRODUCTS_URL;

/** Formato bruto que a API pode devolver. Tudo opcional: normalizamos abaixo. */
interface RawProduct {
  productName?: string;
  name?: string;
  descriptionShort?: string;
  description?: string;
  photo?: string;
  image?: string;
  price?: number | string;
}

interface RawResponse {
  products?: RawProduct[];
}

const toNumber = (value: number | string | undefined): number => {
  if (typeof value === 'number') return value;
  let text = String(value ?? '0').replace(/[^\d,.-]/g, '');
  // "1.499,90" (formato BR): remove os pontos de milhar e troca a vírgula por ponto
  if (text.includes(',')) text = text.replace(/\./g, '').replace(',', '.');
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalize = (raw: RawProduct, index: number): Product => ({
  id: index + 1,
  name: raw.productName ?? raw.name ?? 'Produto',
  description: raw.descriptionShort ?? raw.description ?? '',
  photo: raw.photo ?? raw.image ?? '',
  price: toNumber(raw.price),
});

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(REQUEST_URL, { signal });
  if (!response.ok) {
    throw new Error(`Falha ao carregar produtos (HTTP ${response.status})`);
  }
  const data: RawResponse | RawProduct[] = await response.json();
  const list = Array.isArray(data) ? data : data.products ?? [];
  return list.map(normalize);
}
