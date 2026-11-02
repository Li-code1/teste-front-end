import { describe, expect, it } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formata em reais', () => {
    expect(formatPrice(1499.9)).toBe('R$ 1.499,90');
  });

  it('formata valores redondos e grandes', () => {
    expect(formatPrice(15000)).toBe('R$ 15.000,00');
    expect(formatPrice(0)).toBe('R$ 0,00');
  });
});
