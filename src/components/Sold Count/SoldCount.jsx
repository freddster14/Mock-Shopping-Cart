import PropTypes from 'prop-types';
import styles from './SoldCount.module.css';
import { useLocation } from "react-router-dom";

function SoldCount ({
  rate,
  count,
}) {
  const location = useLocation();
  const isProductPage = location.pathname.includes("product");
  const soldCount = Math.floor(rate * count);
  if(!soldCount) return
  return <p className={isProductPage ? styles.sold_count : styles.sold_count_s}>{soldCount} Sold</p>
}

SoldCount.propTypes = {
  rate: PropTypes.number,
  count: PropTypes.number,
}

export default SoldCount;