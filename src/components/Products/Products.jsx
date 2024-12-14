import PropTypes from "prop-types"
import Loading from "../Route/Loading"

function Products({ items }) {
    if(!items) return <Loading/>
    return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
           ))}
        </ul>
    )
}

Products.propTypes = {
    items:  PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,  
    })),
}

export default Products