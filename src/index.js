import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductContainer from './ProductContainer/ProductContainer';

ReactDOM.render(
    <ProductContainer buttoncode='DSHBTN1' baseUrl="http://demo:demo@doit.zapto.org/shopware-543/" />,
    document.getElementById('root')
);
