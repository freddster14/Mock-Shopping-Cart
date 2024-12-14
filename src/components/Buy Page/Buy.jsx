import PropTypes from "prop-types"
import styles from './Buy.module.css'
import { useState } from "react"
import Counter from "../Counter/Counter"
import { updateCart } from "../Cart/CartLogic"

function Buy({
    item,
    cart,
    setCart,
}) {
  const [quantity, setQuantity] = useState({value: 1})
  
  return (
      <>
        <img src={item.image} alt={item.title} />
        <div>
          <h1>{item.title}</h1>
          <h3>{item.price}</h3>
          <p>{item.description}</p>
          <label htmlFor="quantity">Quantity</label>
          <Counter 
          quantity={quantity.value}
          setQuantity={setQuantity}
          />
          {quantity.value > 0 &&
            <button 
            onClick={() => setCart(updateCart(cart, item, quantity.value))}
            >Add To Cart</button>
          } 
        </div> 
      </>
  )
}

Buy.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string,
      value: PropTypes.number,  
    }),
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

export default Buy