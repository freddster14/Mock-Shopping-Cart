import PropTypes from "prop-types"
import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

export function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    words[0] = words[0].toUpperCase()
    return words.join("");
}


export function Category({ categoryData, setDisplayItems, items }) {
    const location = useLocation();
    const { category } = useParams()
    const homePage = location.pathname === "/";


    function checkSort(data) {
        if(homePage) return
        const sort = document.querySelector("select").value;
        if(!sort) {
        setDisplayItems(data)
        } else {
        sortItems(sort, data)
        }
    }
    function sortItems(value, array) {
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
        }})
        sortedKeys.forEach((key, index) => sortedArray[index] = array[key])
        setDisplayItems(sortedArray)
    }

    if(!categoryData) return <Loading styleName={styles.categories}/>

    return (
        <div className={homePage ? styles.categories : styles.small_categories}>
            {Object.keys(categoryData).map(category => (
                <div 
                key={category} 
                className={styles.category}>
                    <NavLink to={`products/${category}`}
                    onClick={() => checkSort(categoryData[category])}
                    className={({ isActive }) => 
                        `${isActive ? styles.active : ""} 
                        ${homePage ? styles.button_big : styles.button_small}`
                        .trim()
                    }
                    >{capitalizeFirstWord(category)}
                    </NavLink>
                    { homePage &&
                        <div className={styles.image_container}>
                            <img 
                            className={styles.image}
                            src={categoryData[category][1].image} 
                            alt={categoryData[category][1].title}
                            />
                        </div>
                    }
                </div>
            ))}
            { !homePage &&
            <>
            <NavLink to="/products" onClick={() => checkSort(items)} className={homePage ? styles.button_big : styles.button_small}>All</NavLink>
            <select className={styles.select} name="sort" id="sort" onChange={(e) => sortItems(e.target.value, category ? categoryData[category] : items)} >
                <option value="">Sort By</option>
                <option value="price-ascending">Price: Ascending</option>
                <option value="price-descending">Price: Descending</option>
                <option value="rating-ascending">Rating: Ascending</option>
                <option value="rating-descending">Rating: Descending</option>
             </select>
            </>
            
            }
        </div>
    )
}

Category.propType = {
    data: PropTypes.object,
}