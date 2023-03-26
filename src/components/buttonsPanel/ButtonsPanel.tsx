import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Product } from '../../types/products';
import { availableBanknotesForEnter } from '../../mockData/availableBanknotesForEnter';
import { BanknotesOmitCount } from '../../types/banknote';
import {
  buttonsTitle,
  isProductButtonDisabled,
  tooltipTitle,
} from './buttonsPanelUtils';
import classes from './buttonsPanel.module.css';
interface ButtonsPanelProps {
  depositedMoney: number;
  products: Product[];
  handleClickBanknote: (
    clickedBanknoteDenomination: BanknotesOmitCount,
  ) => void;
  handleClickProduct: (product: Product) => void;
  handleClickGetChange: () => void;
}

export default function ButtonsPanel({
  depositedMoney,
  products,
  handleClickBanknote,
  handleClickProduct,
  handleClickGetChange,
}: ButtonsPanelProps) {
  return (
    <div className={classes.buttonsPanel}>
      <div className={classes.buttons}>
        <p className={classes.buttonsTitle}>Внесите купюры:</p>
        {availableBanknotesForEnter.map(banknote => (
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
          <p className={classes.buttonsTitle}>{buttonsTitle(depositedMoney)}</p>
          {products.map(product => (
            <Tooltip
              key={product.id}
              title={tooltipTitle(depositedMoney, product)}>
              <span>
                <Button
                  variant="contained"
                  disabled={isProductButtonDisabled(depositedMoney, product)}
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
          onClick={handleClickGetChange}>
          Получить сдачу
        </Button>
      </div>
    </div>
  );
}
