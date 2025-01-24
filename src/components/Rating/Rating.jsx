import { useLocation } from "react-router-dom";
import styles from "./Rating.module.css"

export default function Rating({ itemRate }) {
    const {rate, count} = itemRate;
    const location = useLocation();
    const isProductPage = location.pathname === "/product-page";
    const isHomePage = location.pathname === "/"
    let starCount = Math.round(rate)
    const decimal = Math.round((rate - Math.floor(rate)) * 10)
    let halfStar = decimal < 8 && decimal > 2 ? true : false;
  
    if(halfStar && starCount > rate) {
       starCount -= 1;
    }
  
    function setStars(stars) {
      const starElements = []
      for(let i = 0; i < 5; i++) {
        if(stars > i) {
          starElements.push(
            <img key={i} src="/src/assets/fullstar.png" alt="Star" className={styles.star}/>
          )
        } else if(halfStar) {
          starElements.push(
            <img key={i} src="/src/assets/halfstar.png" alt="Half Star" className={styles.star}/>
          )
          halfStar = false
        } else {
          starElements.push(
            <img key={i} src="/src/assets/emptystar.png" alt="Empty Star" className={styles.star}/>
          )
        }
      }

      if(isProductPage) {
        return <div className={styles.rating_container_buy}>
            <p className={styles.rate}>{rate}</p> {starElements} 
            <p className={styles.count}>{count} ratings</p>
          </div>
      } else if(isHomePage) {
        return <div className={styles.rating_container_home}>{starElements} ({count})</div>

      } else {
        return <div className={styles.rating_container}>{starElements} ({count})</div>
      }
    }
  
    return (setStars(starCount))
  }