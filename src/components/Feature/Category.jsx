import PropTypes from "prop-types"
import Loading from "../Route/Loading"
import styles from './Category.module.css'
import { NavLink, useLocation } from "react-router-dom";

function capitalizeFirstWord(str) {
    if(!str) return "";
    const words = str.split("");
    const secondIndex = words.indexOf(" ") + 1;
    words[0] = words[0].toUpperCase()
    if(secondIndex) words[secondIndex] = words[secondIndex].toUpperCase();
    return words.join("");
}

function Category({ categoryData }) {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    if(!categoryData) return <Loading styleName={styles.categories_loading}/>

    return (
        <div className={isHomePage ? styles.categories : styles.small_categories}>
            {Object.keys(categoryData).map(category => (
                <div key={category} className={styles.category}>
                    <NavLink 
                    to={`/products/${category}`}
                    className={({ isActive }) => 
                        `${isActive ? styles.active : ""} 
                        ${isHomePage ? styles.button_big : styles.button_small}`
                        .trim()
                    }
                    >   {capitalizeFirstWord(category)}
                    { isHomePage &&
                        <div className={styles.image_container}>
                            <img 
                            className={styles.image}
                            src={categoryData[category][1].image} 
                            alt={categoryData[category][1].title}
                            />
                        </div>
                    }
                    </NavLink>
                </div>
            ))}
            { !isHomePage &&
                <NavLink to="/products/" 
                className={({ isActive }) => 
                    `${isActive ? styles.active : ""} 
                    ${isHomePage ? styles.button_big : styles.button_small}`
                    .trim()
                }
                end>All</NavLink>
            }
        </div>
    )
}

Category.propTypes = {
    categoryData: PropTypes.object,
}

export default Category