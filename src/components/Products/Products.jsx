import PropTypes from "prop-types"
import Category from "../Feature/Category"
import Rating from "../Rating/Rating"
import Loading from "../Route/Loading"
import styles from "./Products.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../Home Page/Home"

function Products({ 
  setSelectedItem, 
  categoryData,
}) {
  const { data } = useContext(DataContext)
  const { category } = useParams()
  const [displayItems, setDisplayItems] = useState();
  const [sortValue, setSortValue]= useState()

  useEffect(() => {
    if (category && data) {
      const selectedCategoryItems = categoryData[category];
      if(!sortValue) return setDisplayItems(selectedCategoryItems);
      sortItems(sortValue, selectedCategoryItems)
    } else {
      if(!sortValue) return  setDisplayItems(data);
      sortItems(sortValue, data)  
    }
  }, [category, categoryData, data, sortValue]); 

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
 
  if(!data) return <Loading/>
  //Set Initial items
  if(!displayItems && !category) {
    setDisplayItems(data)
  } else if(!displayItems && category) {
    setDisplayItems(categoryData[category])
  }
  return (
    <>
      <nav className={styles.nav}>
      <select className={styles.select} name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} >
          <option value="">Sort By</option>
          <option value="price-ascending">Price: Ascending</option>
          <option value="price-descending">Price: Descending</option>
          <option value="rating-ascending">Rating: Ascending</option>
          <option value="rating-descending">Rating: Descending</option>
      </select>
      <Category categoryData={categoryData} />
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
    navigate("/product-page")
     window.scrollTo({
      top:0,
    });
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
          <p className={styles.price}>${parseFloat(item.price).toFixed(2)}</p>
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



export default Products