import { Banknote } from '../../types/banknote';
import { Product } from '../../types/products';
interface ChangeDisplayProps {
  moneyChange: Banknote[];
  productChange: Product[];
  changeAlert: string | number;
}

export default function ChangeDisplay({
  moneyChange,
  productChange,
  changeAlert,
}: ChangeDisplayProps) {
  return (
    <div className={'display'}>
      <p style={{ color: '#f57c00' }}>
        Внимание! При отсутствии купюр автомат выдает сдачу товаром!{' '}
      </p>
      <p> Ваша сдача: </p>
      <div>
        {moneyChange &&
          moneyChange.map(banknote => (
            <p key={banknote.id}>
              {`${banknote.denomination} руб.`} X {banknote.count}
            </p>
          ))}
      </div>
      <div>
        {productChange.map(product => (
          <p key={product.id}>
            {product.name} X {product.count}
          </p>
        ))}
      </div>
      <p
        style={
          typeof changeAlert === 'string'
            ? { color: '#ef5350' }
            : { color: '#00bfa5' }
        }>
        {changeAlert && changeAlert}
      </p>
    </div>
  );
}
