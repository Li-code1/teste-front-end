import type { Product } from '../types/product';
import placeholder from '../assets/img/product-placeholder.png';

/**
 * Usado somente se a API estiver indisponível (ex.: sem internet),
 * para a vitrine e o modal continuarem demonstráveis.
 */
export const fallbackProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  description: 'Many desktop publishing packages and web page editors now many desktop publishing',
  photo: placeholder,
  price: 1499.9,
}));
