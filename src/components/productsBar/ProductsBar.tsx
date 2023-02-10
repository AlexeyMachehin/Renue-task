import { Product } from '../../types/products';
import ProductCard from '../productCard/ProductCard';
import classes from './productsBar.module.css';
interface ProductsBarProps {
  products: Product[];
}

export default function ProductsBar({ products }: ProductsBarProps) {
  return (
    <div className={classes.productsBar}>
      <div className={classes.productsContainer}>
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
