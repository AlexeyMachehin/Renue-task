import React, { useState } from 'react';
import BalanceDisplay from '../balanceDisplay/BalanceDisplay';
import ChangeDisplay from '../changeDisplay/ChangeDisplay';
import ButtonsPanel from '../buttonsPanel/ButtonsPanel';
import { Product } from '../../types/products';
import { Banknote, BanknotesOmitCount } from '../../types/banknote';
import { availableBanknotesForChange } from '../../mockData/availableBanknotesForChange';
import classes from './userBar.module.css';
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

  function reset() {
    setMoneyChange([]);
    setProductChange([]);
    setChangeAlert('');
  }

  function handleClickBanknote(clickedBanknote: BanknotesOmitCount): void {
    const updatedAvailableNotes = availableNotes.map(
      (banknote: Banknote) => {
        if (banknote.denomination === clickedBanknote.denomination) {
          const count = banknote.count + 1;
          return { ...banknote, count };
        }
        return banknote;
      },
    );
    setAvailableNotes(updatedAvailableNotes);
    setDepositedMoney(depositedMoney + clickedBanknote.denomination);
  }

  function countingChange<T extends { count: number }>(
    balance: number,
    updatedAvailableNotes: T[],
    field: keyof T,
  ): T[] {
    const result = [];
    if (balance > 0) {
      for (let i = 0; i < updatedAvailableNotes.length; i++) {
        const value = updatedAvailableNotes[i][field] as number;
        let countBanknotes = updatedAvailableNotes[i].count;
        let countBanknotesOfChange = 0;
        while (balance - value >= 0 && countBanknotes > 0) {
          balance -= value;
          countBanknotes = countBanknotes - 1;
          countBanknotesOfChange++;
        }
        if (countBanknotesOfChange) {
          result.push({
            ...updatedAvailableNotes[i],
            count: countBanknotesOfChange,
          });
        }
      }
    }

    return result;
  }

  function getUpdatedItems<T extends { count: number; id: number }>(
    currentItems: T[],
    [...change]: T[],
  ): T[] {
    return currentItems.map(currentItem => {
      const t = change.find(item => item.id == currentItem.id);
      if (t) {
        currentItem.count -= t.count;
      }
      return currentItem;
    });
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
      (sum, current) => (sum += (current.denomination * current.count)),
      0,
    );
    const changeOfProducts = countingChange<Product>(
      depositedMoney - sumOfMoneyChange,
      products,
      'price',
    );

    const sumOfProductChange = changeOfProducts.reduce(
      (sum, current) => (sum += (current.price * current.count)),
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
            handleClickBanknote={handleClickBanknote}
            depositedMoney={depositedMoney}
            products={products}
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
