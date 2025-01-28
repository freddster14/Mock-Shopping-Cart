import styles from './SoldCount.module.css';
import { useLocation } from "react-router-dom";

function SoldCount ({
  rate,
  count,
}) {
  const location = useLocation();
  const isProductPage = location.pathname.includes("product");

  return <p className={isProductPage ? styles.sold_count : styles.sold_count_s}>{Math.floor(rate * count)} Sold</p>
}

export default SoldCount;