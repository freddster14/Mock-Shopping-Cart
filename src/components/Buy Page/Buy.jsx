import PropTypes from "prop-types"
import styles from './Buy.module.css'
import { Suspense, useState } from "react"
import Loading from "../Route/Loading"
function Buy({
    item,
    cart,
    addToCart,
}) {
  const [quantity, setQuantity] = useState({value: 1})
    console.log(item)
    function quantityEvent(target) {
      let { value, min, max } = target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      if(isNaN(value)) return
      setQuantity({ value });
    }
    function modifyQuantity(value) {
      const input = document.querySelector('input')
      value > 0 ? input.value -= -1 : input.value -= 1   
      console.log(quantity)
      quantityEvent(input)
    }

    return (
        <Suspense fallback={<Loading />}>
        <img src={item.image} alt={item.title} />
        <div>
          <h1>{item.title}</h1>
          <h3>{item.price}</h3>
          <p>{item.description}</p>
          <label htmlFor={styles.label}>Quantity</label>
          <button onClick={() => modifyQuantity(-1)}>-</button>
          <input 
          id={styles.label} 
          value={quantity.value}
          onChange={(e) => quantityEvent(e.target)}
          placeholder="1" 
          min="0" 
          max="99" 
          type="text" />
          <button onClick={() => modifyQuantity(1)}>+</button>
          <button onClick={() => addToCart([...cart, [item, quantity]])}>Add To Cart</button>
        </div>
         
        </Suspense>
    )
}

Buy.propTypes = {
    item: PropTypes.object,
    addToCart: PropTypes.func
}


export default Buy