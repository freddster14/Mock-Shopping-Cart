import PropTypes from "prop-types"
import { Category } from "../Feature/Category"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Products({ 
  items, 
  setSelectedItem, 
  categoryData,
}) {
  const { category } = useParams()
  const navigate = useNavigate();
  const [displayItems, setDisplayItems] = useState();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [category, displayItems])

  function eventFunction(item) {
    setSelectedItem(item)
    navigate('/buy')
  }
 
  
  if(!items) return <Loading/>
  if(!displayItems && !category) {
    setDisplayItems(items)
  } else if(!displayItems && category) {
    setDisplayItems(categoryData[category])
  }
  console.log("ran")
  return (
    <>
      <nav className={styles.nav}>
        <Category categoryData={categoryData} setDisplayItems={setDisplayItems} items={items}/>
      </nav>
      <DisplayItems displayItems={displayItems} eventFunction={eventFunction}/>
    </>
    
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
    setSelectedItem: PropTypes.func,
}

function DisplayItems({ displayItems, eventFunction }) {
   return (
    <section>
          <ul className={styles.items_container}>
            {displayItems.map((item) => (
              <li key={item.id} className={styles.item_container} onClick={() => eventFunction(item)}>
                <div className={styles.image_container}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                </div>
                <h2 className={styles.title}>{item.title}</h2>
                <Rating itemRate={item.rating}/>
                <p className={styles.price}>${item.price}</p>
              </li>
            ))}
          </ul>
        </section>
   )
}



function Rating({ itemRate }) {
  const {rate, count} = itemRate;
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
    return <div className={styles.rating_container}>{starElements} ({count})</div>
  }

  return (
    setStars(starCount)
  )
}


export default Products