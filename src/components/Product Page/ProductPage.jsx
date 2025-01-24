import PropTypes from "prop-types"
import styles from './ProductPage.module.css'
import Rating from "../Rating/Rating"
import BuyModal from "./BuyModal"
import { useState } from "react"
import Counter from "../Counter/Counter"
import { updateCart } from "../Cart/CartLogic"

function ProductPage({
  item,
  cart,
  setCart,
}) {
  const [quantity, setQuantity] = useState({value: 1})
  const [userAddToCart, setUserAddToCart] = useState(false)

  const handleAddToCart = () => {
    setCart(updateCart(cart, item, quantity.value))
    setUserAddToCart(true)
  }

  return (
    <>
      {userAddToCart &&
        <BuyModal 
          item={item} 
          setUserAddToCart={setUserAddToCart} 
          cart={cart} 
          setCart={setCart}
        />
      }
      <div className={styles.buy_container}>
        <div className={styles.img_div}>
          <img src={item.image} alt={item.title} className={styles.image}/>
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{item.title}</h1>
          <Rating itemRate={item.rating}/>
          <h2 className={styles.price}>${item.price}</h2>
          <div className={styles.quantity_buy}>
            <div className={styles.quantity}>
              <label className={styles.label} htmlFor="quantity">Quantity:</label>
              <Counter
              quantity={quantity.value}
              setQuantity={setQuantity}
              />
            </div>
            {quantity.value > 0 &&
              <button
              className={styles.add_to_cart}
              onClick={handleAddToCart}
              >Add To Cart</button>
            }
          </div>
          <div className={styles.separator}></div>
          <div className={styles.info_container}>
            <DropDownInfo
            title="Details"
            info={item.description}
            link={false}
            />
            <DropDownInfo
            title="Shipping"
            info="Free standard shipping on orders over $35. On most stores"
            link={true}
            />
            <DropDownInfo
            title="Returns"
            info="Free return within 28 days of delivery. Unless advised"
            link={true}
            />
            <DropDownInfo
            title="Warranty"
            info="30 day repairs or replacements + shipping insurance"
            link={true}
            />
          </div>
        </div> 
      </div>
    </> 
  )
}

ProductPage.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.string,
      value: PropTypes.number,
      rating: PropTypes.object, 
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


function DropDownInfo({ title, info, link  }) {
  const [isActive, setIsActive] = useState(false);
  const dropDown = () => {
    setIsActive((prev) => !prev)   
  }
  return (
    <div className={styles.drop_down_container}>
      <div 
        className={styles.drop_down_heading}
        onClick={dropDown}
      >
        <h2>{title}</h2>
        <p className={styles.drop_symbol}>{isActive ? "⯅"  : "▼"}</p>
      </div>
      {isActive && 
        <p className={styles.drop_down_info}>{info}. {link && <a>See details</a>}</p>
      }
    </div>
  )
}

DropDownInfo.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  link: PropTypes.bool,
}


export default ProductPage