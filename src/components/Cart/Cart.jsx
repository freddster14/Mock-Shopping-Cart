import PropTypes from "prop-types"

function Cart({ cartItems }) {
    return (
        <ul>
            {cartItems.length > 0 ?
             (cartItems.map((item) => (
                <li key={item.id}>
                    <img src={item.img} alt="" />
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                </li>
            )))
        : <h1>Cart is empty add items</h1>
        }

        </ul>
       
    )
}



Cart.propType = {
    cartItems: PropTypes.array
}

export default Cart