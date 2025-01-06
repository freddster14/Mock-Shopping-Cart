import PropTypes from "prop-types"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"
import { useLocalStorage } from "../../LocalStorage"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Products({ items, setSelectedItem }) {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useLocalStorage("category", "");
    const [categoryItems, setCategoryItems] = useState()

    function eventFunction(item) {
      setSelectedItem(item)
      navigate('/buy')
    }

    function sortByCategory(category) {
      setCategoryItems(categoryData[category])
    }

    if(!items) return <Loading/>
    return (
      <>
        <nav>
        {Object.keys(categoryData).map(category => {
          return (
           <button key={category} onClick={() => sortByCategory(category)}>{category}</button>
          )
        })}
        </nav>

        { !categoryItems 
          ? <DisplayItems items={items} eventFunction={eventFunction}/> 
          : <DisplayItems items={categoryItems} eventFunction={eventFunction}/>
        }
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
    console.log(starElements)
    return <div className={styles.rating_container}>{starElements} ({count})</div>
  }

  return (
    setStars(starCount)
  )
}

function Sort() {
  const [categoryData, setCategoryData] = useLocalStorage("category", "")
 return (
    <>
      {categoryData.map(item => {
        console.log(item)
      })}

    </>
 )
}

export default Products