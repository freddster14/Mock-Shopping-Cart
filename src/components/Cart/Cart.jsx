import PropTypes from "prop-types"
import Counter from "../Counter/Counter"
import { updateCart } from "./CartLogic"
import { useState } from "react"
import styles from "./Cart.module.css"

function Cart({ 
  cart,
  setCart,
}) {
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
            <li key={item.id} className={styles.item}>
              <CartItems
                cart={cart}
                item={item}
                setCart={setCart}
                removeItem={removeItem}
              />
            </li>
          )))
          : <h1>Cart is empty add items</h1>
          }
        </ul>
      </div>
      
      <div className={styles.total_container}>
        <p>Item{cart.length > 1 ? `s (${cart.length})` : `(${cart.length})`}</p>
      </div>
    </div> 
  )
}

function CartItems({ 
  cart,
  item,
  setCart,
  removeItem,
 }) {
  const [quantity, setQuantity] = useState({value: item.value})
  const isShippingFree = console.log(cart)
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
      <div>
        <p>{item.title}</p>
        <p>{isShippingFree ? "Free Shipping" : "Shipping $7.99"}</p>
        <p>Free returns</p>
        <div className={styles.item_settings}>
          <Counter 
          quantity={quantity.value}
          setQuantity={updateQuantity}
          />
          <button onClick={() => removeItem(item.id) }>Delete</button>
        </div>
      </div>
      <p>${item.price}</p>
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