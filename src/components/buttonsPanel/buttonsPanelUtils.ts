import { Product } from '../../types/products';

export function tooltipTitle(money: number, product: Product) {
  return `${product.name} ${!product.count ? ' - Товара нет в наличии' : ''} ${
    product.price > money && product.count > 0
      ? ' - Недостаточно средств, пополните баланс'
      : ''
  }`;
}

export function buttonsTitle(money: number) {
  return money ? 'Выберите товар:' : 'Пополните баланс, затем выберите товар';
}

export function isProductButtonDisabled(money: number, product: Product) {
  return !money || !product.count || product.price > money;
}
