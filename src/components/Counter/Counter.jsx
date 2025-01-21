import PropTypes from "prop-types"
import styles from "./Counter.module.css"

function Counter({ 
    quantity,
    setQuantity,
 }) {

    function quantityEvent(target) {
        let { value, min, max } = target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        if(isNaN(value)) return
        setQuantity({ value });
    }
    //Button increment / decrement logic
    function modifyQuantity(value, input) {
        value > 0 ? input.value -= -1 : input.value -= 1   
        quantityEvent(input)
    }
    return (
        <div className={styles.container}>
          <button className={styles.minus} onClick={(e) => modifyQuantity(-1, e.target.nextElementSibling)}>−</button>
          <input 
          className={styles.input} 
          value={quantity}
          onChange={(e) => quantityEvent(e.target)}
          placeholder={quantity} 
          min="0" 
          max="99" 
          type="text" />
          <button className={styles.plus} onClick={(e) => modifyQuantity(1, e.target.previousElementSibling)}>+</button>
        </div> 
    )
}

Counter.propTypes = {
    quantity: PropTypes.number,
    setQuantity: PropTypes.func,
}

export default Counter