import { useEffect, useState } from "react"
import styles from './Products.module.css'

export default function HamburgerMenu ({ menuDisplay ,setMenuDisplay }) {
  const [isActive, setIsActive] = useState(false)
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

  const handleClick = () => {
    setIsActive(!isActive)
    setMenuDisplay(!menuDisplay)
  }

  
  
  return (
    <>
     
       <img 
      src="/src/assets/icons8-hamburger-menu-50.png" 
      alt="side bar button"
      className={`${styles.hamburger} ${isActive && styles.hamburger_active}`} 
      onClick={handleClick}
      />
      
     
      
    
    </>
   
   
  )
}