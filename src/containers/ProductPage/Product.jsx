import React from 'react';
import css from './ProductPage.css'
import { Link } from 'react-router-dom';

function Product(props){
    //const imgSrc = require("./img/" + props.productImg + "");
    //const bannerSrc = require("./img/" + props.productBanner + "");
    return (
        <div className={css.productContainer}>
            <Link to={'/product-detail/'+props.productID} style={{ textDecoration: 'none' }}>
            <div className={css.productImageBanner}>
                <img className={css.banner} src={props.productBanner} alt={props.productName + " Banner"}></img>
            </div>
            <div className={css.productContent}>
                <div className={css.words}>
                    <div className={css.productHeader}>
                        <h3>{props.productName}</h3>
                    </div>
                    <div className={css.productDescript}>
                        <p>{props.productDescription}</p>
                    </div>
                </div>
                <div className={css.feature}>
                    <img className={css.productImage} src={props.productImg} alt={props.productName + " Image"}></img>
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Product;