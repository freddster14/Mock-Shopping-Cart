import PropTypes from "prop-types"
import Counter from "../Counter/Counter"
import { updateCart } from "./CartLogic"
import { Fragment, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./Cart.module.css"

function Cart({ 
  cart,
  setCart,
}) {
  const cartInfo = getCartInfo()

  function getCartInfo() {
    let quantity = 0;
    let subTotal = 0;
    let total = 0;
    let shipping = 0;
    let tax = 0.0712;
    for(let item of cart) {
      subTotal += (item.price * item.value);
      quantity += item.value
    }
    shipping += ((subTotal > 45) ?  0 : 5.99);
    tax = (subTotal * tax);

    tax = tax.toFixed(2);

    total =  parseFloat(subTotal) + parseFloat(tax) + shipping;
    total = total.toFixed(2);
    return {
      quantity: quantity,
      subTotal: subTotal,
      shipping: shipping,
      taxTotal: tax,
      total: total
    } 
  }
  
  function removeItem(id) {
    const newArray = cart.filter(item => item.id !== id )
    setCart(newArray)
  }
  return (
    <div className={styles.body}>
      {cart.length === 0 
      ?
        <>
          <h1 className={styles.empty_title}>Your MockBox Cart is empty</h1>
          <p>Check out our  <NavLink className={styles.home_link}  to="/">latest drop and HOT items.</NavLink></p>
        </>
      : 
        <>
          <div className={styles.heading}>
            <h1>Shopping Cart</h1>
            <h2>Price</h2>
          </div>
          <div className={styles.data_container}>
            <div className={styles.cart_container}>
              <ul className={styles.list_items}>
                {cart.map((item) => (
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
                ))}
                <p className={styles.sub_total}>
                  Subtotal ({cartInfo.quantity}) 
                  <span>${(cartInfo.subTotal).toFixed(2)}</span>
                </p>      
              </ul>
            </div>
            {cart.length > 0 &&
            <div className={styles.total_container}>
              <p>
                Item 
                {cartInfo.quantity > 1 
                  ? `s (${cartInfo.quantity})` 
                  : ` (${cartInfo.quantity})`
                }
                <span>
                ${(cartInfo.subTotal).toFixed(2)}
                </span>
              </p>
              <p>
                Shipping 
                <span>{ cartInfo.shipping ? "$" + cartInfo.shipping : "Free"}</span>
              </p>
              <div className={styles.line}></div>
              <p className={styles.sub_total}>Subtotal <span>${(cartInfo.subTotal + cartInfo.shipping).toFixed(2)}</span></p>
              <NavLink className={styles.checkout} to="#">Go to checkout</NavLink>
            </div>
            }
          </div>
        </>
      
      }
     
    </div> 
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

function CartItems({ 
  cart,
  item,
  setCart,
  removeItem,
  cartInfo,
 }) {
  const [quantity, setQuantity] = useState({value: item.value})
  const isShippingFree = cartInfo.subTotal > 45;
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
        <p>{isShippingFree ? "Free shipping" : "Free shipping over $45"}</p>
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
    cartInfo: PropTypes.object,
}

export default Cart