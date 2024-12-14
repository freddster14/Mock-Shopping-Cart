import PropTypes from "prop-types"
import Counter from "../Counter/Counter"
import { updateCart } from "./CartLogic"
import { useState } from "react"

function Cart({ 
    cart,
    setCart,
 }) {
    function removeItem(id) {
        const newArray = cart.filter(item => item.id !== id )
        setCart(newArray)
    }

    return (
        <ul>
            {cart.length > 0 ?
             (cart.map((item) => (
                <CartItems 
                cart={cart}
                item={item}
                setCart={setCart} 
                removeItem={removeItem}
                key={item.id}
                />
              )))
              : <h1>Cart is empty add items</h1>
            }
        </ul>    
    )
}

function CartItems({ 
    cart,
    item,
    setCart,
    removeItem,
 }) {
    const [quantity, setQuantity] = useState({value: item.value})
    function updateQuantity(quantity) {
        setQuantity(quantity)
        setCart(updateCart(cart, item, quantity.value - item.value))
    }
    return (
        <div>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>${item.price}</p>
            <Counter 
            quantity={quantity.value}
            setQuantity={updateQuantity}
            />
            <button onClick={() => removeItem(item.id) }>Delete</button>
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