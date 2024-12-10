import PropTypes from "prop-types"

function Cart({ cartItems }) {
    console.log(cartItems)
    return (
        <ul>
            {cartItems.length > 0 ?
             (cartItems.map((item) => (
                <div key={item[0].id}>
                    <img src={item[0].image} alt="" />
                    <p>{item[0].title}</p>
                    <p>${item[0].price}</p>
                    <p>{item[1].value}</p>
                    <button onClick={() => console.log(item) }>Delete</button>
                </div>
            )))
        : <h1>Cart is empty add items</h1>
        }

        </ul>
       
    )
}




Cart.propTypes = {
    cartItems: PropTypes.array,
}

export default Cart