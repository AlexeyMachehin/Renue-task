import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Product } from '../../types/products';
import { availableBanknotesForEnter } from '../../mockData/availableBanknotesForEnter';
import { BanknotesOmitCount } from '../../types/banknote';
import classes from './buttonsPanel.module.css';
interface ButtonsPanelProps {
  handleClickBanknote: (
    clickedBanknoteDenomination: BanknotesOmitCount,
  ) => void;
  depositedMoney: number;
  products: Product[];
  handleClickProduct: (product: Product) => void;
  handleClickGetChange: () => void;
}

export default function ButtonsPanel({
  handleClickBanknote,
  depositedMoney,
  products,
  handleClickProduct,
  handleClickGetChange,
}: ButtonsPanelProps) {
  return (
    <div className={classes.buttonsPanel}>
      <div className={classes.buttons}>
        <p className={classes.buttonsTitle}>Внесите купюры:</p>
        {availableBanknotesForEnter.map((banknote: BanknotesOmitCount) => (
          <Button
            key={banknote.id}
            variant="contained"
            onClick={() => handleClickBanknote(banknote)}>
            {`${banknote.denomination} руб.`}
          </Button>
        ))}
      </div>
      <div>
        <div className={classes.buttons}>
          <p className={classes.buttonsTitle}>
            {depositedMoney
              ? 'Выберите товар:'
              : 'Пополните баланс, затем выберите товар'}
          </p>
          {products.map((product: Product) => (
            <Tooltip
              key={product.id}
              title={`${product.name} ${
                !product.count ? ' - Товара нет в наличии' : ''
              } ${
                product.price > depositedMoney && product.count > 0
                  ? ' - Недостаточно средств, пополните баланс'
                  : ''
              }`}>
              <span>
                <Button
                  variant="contained"
                  disabled={
                    !depositedMoney ||
                    !product.count ||
                    product.price > depositedMoney
                  }
                  onClick={() => handleClickProduct(product)}>
                  {product.id}
                </Button>
              </span>
            </Tooltip>
          ))}
        </div>
      </div>
      <div>
        <Button
          className={classes.getChangeButton}
          variant="contained"
          onClick={() => handleClickGetChange()}>
          Получить сдачу
        </Button>
      </div>
    </div>
  );
}
