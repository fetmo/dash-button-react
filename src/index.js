import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import FetchDemo from './FetchDemo';

ReactDOM.render(
    <FetchDemo subreddit="reactjs" baseUrl="http://demo:demo@doit.zapto.org/shopware-543/"/>,
    document.getElementById('root')
);
