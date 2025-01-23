import PropTypes from "prop-types"
import styles from './Buy.module.css'
import Rating from "../Rating/Rating"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import Counter from "../Counter/Counter"
import { updateCart } from "../Cart/CartLogic"

function Buy({
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

  const handleCloseModal = () => {
    setUserAddToCart(false);
  }

  function removeItem(id) {
    const newArray = cart.filter(item => item.id !== id )
    setCart(newArray)
    handleCloseModal()
  }

  function returnItemQuantity() {
    const index = cart.findIndex(obj => obj.id === item.id);
    return cart[index].value
  }

  return (
    <>
      {userAddToCart &&
        <div className={styles.cart_modal}>
          <div className={styles.heading}>
            <h1><span>✅</span>Added to cart</h1>
            <button 
            className={styles.close_modal} 
            onClick={handleCloseModal}>×</button>
          </div>
          <div className={styles.item_container_modal}>
            <div className={styles.img_container_modal}>
              <img src={item.image} alt={item.title}/>
            </div>
            <div className={styles.modal_info}>
            <p className={styles}>{item.title}</p>
            <p>${item.price}</p>
            </div>
            <p>Quantity {returnItemQuantity()}</p>
          </div>
          <p>Shipping <span>Free</span></p>
          <NavLink to="/cart">See in cart</NavLink>
          <button onClick={() => removeItem(item.id)}>Remove item</button>
        </div> 
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
            css={styles.details}
            title="Details"
            info={item.description}
            link={false}
            />
            <DropDownInfo
            css={styles.shipping}
            title="Shipping"
            info="Free standard shipping on orders over $35. On most stores"
            link={true}
            />
            <DropDownInfo
            css={styles.return}
            title="Returns"
            info="Free return within 28 days of delivery. Unless advised"
            link={true}
            />
            <DropDownInfo
            css={styles.warranty}
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

Buy.propTypes = {
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


function DropDownInfo({ css, title, info, link  }) {
  const [isActive, setIsActive] = useState(false);
  const dropDown = () => {
    setIsActive((prev) => !prev)   
  }
  return (
    <div className={`${css} ${styles.drop_down_container}`}>
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


export default Buy