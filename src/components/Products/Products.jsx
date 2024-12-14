import PropTypes from "prop-types"
import Loading from "../Route/Loading"

function Products({ cart }) {
    console.log(cart)
    if(!cart) return <Loading/>
    
    return (
        
        <ul>
          {cart.map((item) => (
            <li key={item.id}>{item.title}</li>
           ))}
        </ul>
       
    )
}

Products.propTypes = {
    cart:  PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
        value: PropTypes.number.isRequired,  
    })),
}

export default Products