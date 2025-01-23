import styles from './BuyModal.module.css'
import { NavLink } from "react-router-dom"


function BuyModal({ item, setUserAddToCart, cart, setCart }) {

    function removeItem(id) {
        const newArray = cart.filter(item => item.id !== id )
        setCart(newArray)
        handleCloseModal()
    }
    
    const handleCloseModal = () => {
        setUserAddToCart(false);
    }

    function returnItemQuantity() {
        const index = cart.findIndex(obj => obj.id === item.id);
        return cart[index].value
    }

    return (
        <>
        
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
      
        </>
        
    )
}

export default BuyModal