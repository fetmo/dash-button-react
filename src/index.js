import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FetchDemo from './FetchDemo';
import ProductContainer from './ProductContainer/ProductContainer';

ReactDOM.render(
    <ProductContainer subreddit="reactjs" baseUrl="http://demo:demo@doit.zapto.org/shopware-543/"/>,
    document.getElementById('root')
);
