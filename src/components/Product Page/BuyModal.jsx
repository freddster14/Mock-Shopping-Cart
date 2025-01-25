import styles from './BuyModal.module.css'
import { NavLink } from "react-router-dom"

function BuyModal({ 
  item, 
  setUserAddToCart, 
  cart, 
  setCart 
  }) {
  function removeItem(id) {
    const newArray = cart.filter(item => item.id !== id )
    setCart(newArray)
    handleCloseModal()
  }

  const handleCloseModal = () => {setUserAddToCart(false)}

  function returnItemQuantity() {
    const index = cart.findIndex(obj => obj.id === item.id);
    return cart[index].value
  }

  return (
    <div className={styles.cart_modal_background}>
      <div className={styles.modal_container}>
        <div className={styles.heading}>
          <h1><span>✅</span>Added to cart</h1>
          <button
          className={styles.close_modal}
          onClick={handleCloseModal}>×</button>
        </div>
        <div className={styles.modal_item}>
          <div className={styles.img_container}>
            <img src={item.image} alt={item.title}/>
          </div>
          <p>{item.title}</p>
        </div>
        <div className={styles.item_info}>
          <p>Price <span>${parseFloat(item.price).toFixed(2)}</span></p>
          <p>In Cart <span>{returnItemQuantity()}</span></p>
        </div>
        <NavLink to="/cart" className={styles.open_cart}>See in cart</NavLink>
        <button  className={styles.remove} onClick={() => removeItem(item.id)}>Remove item</button>
      </div>
    </div>  
  )
}

export default BuyModal