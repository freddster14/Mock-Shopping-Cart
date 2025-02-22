import { useEffect, useState } from "react"
import styles from './Products.module.css'
import PropTypes from "prop-types"


export default function HamburgerMenu ({ menuDisplay ,setMenuDisplay }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 615) {
        setMenuDisplay(false)
        setIsActive(false)
      } else {
        setMenuDisplay(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMenuDisplay]);

  useEffect(() => {
    if(!menuDisplay) setIsActive(false)
  }, [menuDisplay])

  const handleClick = () => {
    setIsActive(!isActive)
    setMenuDisplay(!menuDisplay)
  }

  return (
    <input
      type="image"
      src="/src/assets/icons8-hamburger-menu-50.png" 
      alt="side bar button"
      className={`${styles.hamburger} ${isActive && styles.hamburger_active}`} 
      onClick={handleClick}
    />
  )
}

HamburgerMenu.propTypes = {
  menuDisplay: PropTypes.bool,
  setMenuDisplay: PropTypes.func,
}