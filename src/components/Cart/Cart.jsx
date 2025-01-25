import PropTypes from "prop-types"
import Counter from "../Counter/Counter"
import { updateCart } from "./CartLogic"
import { Fragment, useState } from "react"
import styles from "./Cart.module.css"

function Cart({ 
  cart,
  setCart,
}) {
  const cartInfo = getCartInfo()

  function getCartInfo() {
    let quantity = 0;
    let subTotal = 0;
    for(let item of cart) {
      subTotal += (item.price * item.value);
      quantity += item.value
    }
    subTotal = parseFloat(subTotal).toFixed(2);
    return {total: subTotal, quantity: quantity}
  }
  
  function removeItem(id) {
    const newArray = cart.filter(item => item.id !== id )
    setCart(newArray)
  }
  return (
    <div className={styles.body}>
      <div className={styles.cart_container}>
        <div className={styles.heading}>
          <h1>Shopping Cart</h1>
          <h2>Price</h2>
        </div>
        <ul className={styles.list_items}>
        {cart.length > 0
          ? (cart.map((item) => (
            <Fragment key={item.id}>
              <li  className={styles.item_card}>
              <CartItems
                cart={cart}
                item={item}
                setCart={setCart}
                removeItem={removeItem}
                cartInfo={cartInfo}
              />
              </li>
            </Fragment>
          )))
          : <h1>Cart is empty add items</h1>
          }
        </ul>
      </div>
      <div className={styles.total_container}>
        <p>Item{cartInfo.quantity > 1 ? `s (${cartInfo.quantity})` : `(${cartInfo.quantity})`}</p>
        <p>Subtotal <span>{cartInfo.total}</span></p>
      </div>
    </div> 
  )
}

function CartItems({ 
  cart,
  item,
  setCart,
  removeItem,
  cartInfo,
 }) {
  const [quantity, setQuantity] = useState({value: item.value})
  const isShippingFree = cartInfo.total > 35;
  function updateQuantity(quantity) {
    const updatedCart = updateCart(cart, item, quantity.value - item.value);
    setQuantity(quantity)
    setCart(updatedCart)
  }
  return (
    <>
      <div className={styles.img_container}>
        <img src={item.image} alt={item.title} />
      </div>
      <div className={styles.item_info}>
        <div className={styles.item_heading}>
          <p>{item.title}</p>
          <p className={styles.price}>${parseFloat(item.price).toFixed(2)}</p>
        </div>
        <p>{isShippingFree ? "Free shipping" : "Free shipping over $30"}</p>
        <p>Free returns</p>
        <div className={styles.item_settings}>
          <Counter 
          quantity={quantity.value}
          setQuantity={updateQuantity}
          />
          <button className={styles.delete} onClick={() => removeItem(item.id) }>Delete</button>
        </div>
      </div>
    </>
  )
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            price: PropTypes.number,
            description: PropTypes.string,
            image: PropTypes.string,
            value: PropTypes.number.isRequired,  
        })
    ),
    setCart: PropTypes.func
}

CartItems.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
        value: PropTypes.number.isRequired,  
    }),
    removeItem: PropTypes.func,
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            price: PropTypes.number,
            description: PropTypes.string,
            image: PropTypes.string,
            value: PropTypes.number.isRequired,  
        })
    ),
    setCart: PropTypes.func,
}

export default Cart