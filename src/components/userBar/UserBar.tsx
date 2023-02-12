import React, { useState } from 'react';
import BalanceDisplay from '../balanceDisplay/BalanceDisplay';
import ChangeDisplay from '../changeDisplay/ChangeDisplay';
import ButtonsPanel from '../buttonsPanel/ButtonsPanel';
import { Product } from '../../types/products';
import { Banknote, BanknotesOmitCount } from '../../types/banknote';
import { availableBanknotesForChange } from '../../mockData/availableBanknotesForChange';
import classes from './userBar.module.css';
import { countingChange } from './utils/countingChange';
import { getUpdatedItems } from './utils/getUpdatedItems';
interface UserBarProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function UserBar({ products, setProducts }: UserBarProps) {
  const [availableNotes, setAvailableNotes] = useState<Banknote[]>(
    availableBanknotesForChange,
  );
  const [depositedMoney, setDepositedMoney] = useState<number>(0);
  const [boughtProduct, setBoughtProduct] = useState<Product | null>(null);
  const [moneyChange, setMoneyChange] = useState<Banknote[]>([]);
  const [productChange, setProductChange] = useState<Product[]>([]);
  const [changeAlert, setChangeAlert] = useState<string | number>('');

  function reset(): void {
    setMoneyChange([]);
    setProductChange([]);
    setChangeAlert('');
  }

  function handleClickBanknote(clickedBanknote: BanknotesOmitCount): void {
    const updatedAvailableNotes = availableNotes.map(banknote => {
      if (banknote.denomination === clickedBanknote.denomination) {
        const count = banknote.count + 1;
        return { ...banknote, count };
      }
      return banknote;
    });
    setAvailableNotes(updatedAvailableNotes);
    setDepositedMoney(depositedMoney + clickedBanknote.denomination);
  }

  function handleClickGetChange(): void {
    reset();

    const change = countingChange<Banknote>(
      depositedMoney,
      availableNotes,
      'denomination',
    );

    const updatedBanknotes = getUpdatedItems<Banknote>(availableNotes, change);

    const sumOfMoneyChange = change.reduce(
      (sum, current) => (sum += current.denomination * current.count),
      0,
    );
    const changeOfProducts = countingChange<Product>(
      depositedMoney - sumOfMoneyChange,
      products,
      'price',
    );

    const sumOfProductChange = changeOfProducts.reduce(
      (sum, current) => (sum += current.price * current.count),
      0,
    );

    const updatedProduct = getUpdatedItems<Product>(products, changeOfProducts);

    setProducts(updatedProduct);
    setProductChange(changeOfProducts);
    setAvailableNotes(updatedBanknotes);
    setMoneyChange(change);
    setDepositedMoney(0);
    setBoughtProduct(null);

    if (sumOfMoneyChange + sumOfProductChange < depositedMoney) {
      setChangeAlert(
        `Извините, нет сдачи, позвоните по номеру: 88005677453 и мы вернем вам ${
          depositedMoney - sumOfMoneyChange - sumOfProductChange
        } руб.`,
      );
    }
  }

  function handleClickProduct(product: Product): void {
    reset();
    const updatedProducts = getUpdatedItems(products, [
      { ...product, count: 1 },
    ]);

    setProducts(updatedProducts);
    setDepositedMoney(depositedMoney - product.price);
    setBoughtProduct(product);
  }

  return (
    <div className={classes.userBar}>
      <div className={classes.userBarContainer}>
        <div className={classes.userBarPanel}>
          <BalanceDisplay
            depositedMoney={depositedMoney}
            boughtProduct={boughtProduct}
          />
          <ButtonsPanel
            depositedMoney={depositedMoney}
            products={products}
            handleClickBanknote={handleClickBanknote}
            handleClickProduct={handleClickProduct}
            handleClickGetChange={handleClickGetChange}
          />
          <ChangeDisplay
            changeAlert={changeAlert}
            moneyChange={moneyChange}
            productChange={productChange}
          />
        </div>
      </div>
    </div>
  );
}
