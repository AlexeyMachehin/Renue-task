import type { Product } from '../../types/products';
interface BalanceDisplayProps {
  depositedMoney: number;
  boughtProduct: Product | null;
}

export default function BalanceDisplay({
  depositedMoney,
  boughtProduct,
}: BalanceDisplayProps) {
  return (
    <div className={'display'}>
      <p>Баланс: {`${depositedMoney} руб.`}</p>
      <p>
        Вы купили товар:
        {boughtProduct &&
          ` "${boughtProduct.name}" за сумму:
        ${boughtProduct.price} руб`}
      </p>
    </div>
  );
}
