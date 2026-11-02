const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 1499.9 -> "R$ 1.499,90" */
export const formatPrice = (value: number): string =>
  brl.format(value).replace(/\u00a0/g, ' ');
