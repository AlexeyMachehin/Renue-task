import { useState } from 'react';
import { Product } from '../../types/products';
import ProductsBar from '../productsBar/ProductsBar';
import UserBar from '../userBar/UserBar';
import { availableProducts } from '../../mockData/availableProducts';

export default function VendingMachine() {
  const [products, setProducts] = useState<Product[]>(availableProducts);

  return (
    <div className="vendingMachineWrapper">
      <ProductsBar products={products} />
      <UserBar products={products} setProducts={setProducts} />
    </div>
  );
}
