import PropTypes from "prop-types"
import { useLocalStorage } from "../../LocalStorage"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    words[0] = words[0].toUpperCase()
    return words.join("");
}

export function Category({ categoryData }) {
    const [displayItems, setDisplayItems] = useLocalStorage("displayItems", "");
    const location = useLocation();
    const navigate = useNavigate();
    const homePage = location.pathname === "/";
    function jumpToCategory(category) {
        setDisplayItems(categoryData[category]);
        navigate('products')
    }
    if(!categoryData) return <Loading styleName={styles.categories}/>
    console.log(location.pathname)
    return (
        <div className={styles.categories}>
            {Object.keys(categoryData).map(category => (
                <div key={category} className={styles.category} onClick={() => jumpToCategory(category)}>
                    <button className={homePage ? styles.button_big : styles.button_small}>{capitalizeFirstWord(category)}</button>
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
        </div>
    )
}

Category.propType = {
    data: PropTypes.object,
}