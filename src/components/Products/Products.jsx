import PropTypes from "prop-types"
import  Category  from "../Feature/Category"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Products({ 
  items, 
  setSelectedItem, 
  categoryData,
}) {
  const { category } = useParams()
  const [displayItems, setDisplayItems] = useState();
  const [sortValue, setSortValue]= useState()

  useEffect(() => {
    if (category && items) {
      const selectedCategoryItems = categoryData[category];
      if(!sortValue) return setDisplayItems(selectedCategoryItems);
      console.log("ran")
      sortItems(sortValue, selectedCategoryItems)
    } else {
      if(!sortValue) return  setDisplayItems(items);
      sortItems(sortValue, items)  
    }
  }, [category, categoryData, items, sortValue]); 

  function sortItems(value, array) {
    const sortedArray = [...array].sort((a,b) => {
      switch (value) {
        case "price-ascending":
        return  a.price - b.price; 
        case "price-descending":
        return b.price - a.price;
        case "rating-ascending":
        return a.rating.rate - b.rating.rate
        case "rating-descending":
        return b.rating.rate - a.rating.rate
      }
    })
    setDisplayItems(sortedArray)
  }

  function handleSortChange(value) {
    setSortValue(value);
    sortItems(value, displayItems)
  }
 
  if(!items) return <Loading/>
  //Set Initial items
  if(!displayItems && !category) {
    setDisplayItems(items)
  } else if(!displayItems && category) {
    setDisplayItems(categoryData[category])
  }
  return (
    <>
      <nav className={styles.nav}>
        <Category categoryData={categoryData} setDisplayItems={setDisplayItems} items={items}/>
        <select className={styles.select} name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} >
          <option value="">Sort By</option>
          <option value="price-ascending">Price: Ascending</option>
          <option value="price-descending">Price: Descending</option>
          <option value="rating-ascending">Rating: Ascending</option>
          <option value="rating-descending">Rating: Descending</option>
        </select>
      </nav>
      <DisplayItems displayItems={displayItems} setSelectedItem={setSelectedItem}/>
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
    categoryData: PropTypes.object,
}

function DisplayItems({ displayItems, setSelectedItem }) {
  const navigate = useNavigate();

  function eventFunction(item) {
    setSelectedItem(item);
    navigate("/buy")
  }
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

DisplayItems.propTypes = {
  displayItems: PropTypes.array,
  setSelectedItem: PropTypes.func,
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

  return (setStars(starCount))
}

export default Products