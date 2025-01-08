import PropTypes from "prop-types"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"
import { capitalizeFirstWord } from "../Feature/Category"
import { useLocalStorage } from "../../LocalStorage"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Products({ items, setSelectedItem }) {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useLocalStorage("category", "");
  const [displayItems, setDisplayItems] = useLocalStorage("displayItems", "");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [displayItems])

  function eventFunction(item) {
    setSelectedItem(item)
    navigate('/buy')
  }
  function sortByCategory(category) {
    const select = document.querySelector("select");
    if(!category) {
      return sortItems(select, items) 
    }else if(select.value) {
      return sortItems(select , categoryData[category])
    } else{
      setDisplayItems(categoryData[category])
    }
  }
  function sortItems(element, array = displayItems) {
    const value = element.value;
    console.log("ran")
    let sortedArray = [];
    let sortedKeys;
    sortedKeys = Object.keys(array).sort((a,b) => {
      switch (value) {
        case "price-ascending":
          return array[a].price - array[b].price; 
        case "price-descending":
          return array[b].price - array[a].price;
        case "rating-ascending":
          return array[a].rating.rate - array[b].rating.rate
        case "rating-descending":
          return array[b].rating.rate - array[a].rating.rate
      } 

    })
    sortedKeys.forEach((key, index) => sortedArray[index] = array[key])
    setDisplayItems(sortedArray)
  }

  if(!items) return <Loading/>
  if(!displayItems) setDisplayItems(items)
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.button_container}>
          {Object.keys(categoryData).map(category => {
          return (
          <button key={category} onClick={() => sortByCategory(category)}>{capitalizeFirstWord(category)}</button>
          )
          })}
          <button onClick={() => sortByCategory()}>All</button>
        </div>
        <select name="sort" id="sort" onChange={(e) => sortItems(e.target)} >
          <option value="">Sort By</option>
          <option value="price-ascending">Price: Ascending</option>
          <option value="price-descending">Price: Descending</option>
          <option value="rating-ascending">Rating: Ascending</option>
          <option value="rating-descending">Rating: Descending</option>
        </select>
      </nav>
      <DisplayItems items={displayItems} eventFunction={eventFunction}/>
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

function DisplayItems({ items, eventFunction }) {
   return (
    <section>
          <ul className={styles.items_container}>
            {items.map((item) => (
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
          <img key={i} src="src/assets/fullstar.png" alt="Star" className={styles.star}/>
        )
      } else if(halfStar) {
        starElements.push(
          <img key={i} src="src/assets/halfstar.png" alt="Half Star" className={styles.star}/>
        )
        halfStar = false
      } else {
        starElements.push(
          <img key={i} src="src/assets/emptystar.png" alt="Empty Star" className={styles.star}/>
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