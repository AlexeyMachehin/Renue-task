import { memo } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import FullscreenToggler from '../fullscreenToggler/FullscreenToggler';
import { normalizeWords } from './utils/normalizeWords';
import { Product } from '../../types/products';
import classes from './productCard.module.css';
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className={classes.productCard} key={product.id}>
      <CardMedia
        id={product.name.replace(/\s/g, '')}
        className={classes.productImage}
        image={product.image}
        title={product.name}>
        <FullscreenToggler elementId={product.name.replace(/\s/g, '')} />
      </CardMedia>

      <CardContent className={classes.cardContent}>
        <p>{`#${product.id} ${product.name}`}</p>
        <p>{product.weight}</p>
        <p>{`Цена: ${product.price} ${normalizeWords(product.price, [
          'рубль',
          'рубля',
          'рублей',
        ])}`}</p>
        <p
          style={{
            color: `${product.count === 0 && 'var(--no-change-color)'}`,
          }}>{`Остаток: ${product.count} шт.`}</p>
      </CardContent>
    </Card>
  );
}

export default memo(ProductCard);
