import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, id } = props.item;

  const dispatch = useDispatch()

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({id, title}))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
