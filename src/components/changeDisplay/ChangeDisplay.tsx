import { memo } from 'react';
import { Banknote } from '../../types/banknote';
import { Product } from '../../types/products';
import classes from './changeDisplay.module.css';
interface ChangeDisplayProps {
  moneyChange: Banknote[];
  productChange: Product[];
  changeAlert: string | number;
}
function ChangeDisplay({
  moneyChange,
  productChange,
  changeAlert,
}: ChangeDisplayProps) {
  return (
    <div className={'display'}>
      <p className={classes.changeDisplayTitle}>
        Внимание! При отсутствии купюр автомат выдает сдачу товаром!
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
            ? { color: 'var(--no-change-color)' }
            : { color: 'var(--get-change-button-color)' }
        }>
        {changeAlert && changeAlert}
      </p>
    </div>
  );
}

export default memo(ChangeDisplay);
