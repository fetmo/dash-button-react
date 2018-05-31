import React, {Component} from "react";
import FormattedAmount from 'react-formatted-amount';
import './ProductBox.css';

class FetchDemo extends Component {

    render() {
        let product = this.props.product;

        return (
            <div className="ProductBox">
                <p className="Title">
                    <strong>{product.title}</strong>
                </p>
                <p className="Content">
                    <span className="Line">
                        <span className="Label">Stückreis:</span>
                        <span className="Value"><FormattedAmount lang="en" amount={product.price} currency={'€'} separator={','}/></span>
                    </span>
                    <span className="Line">
                        <span className="Label">Menge:</span>
                        <span className="Value">{product.quantity}</span>
                    </span>
                    <span className="Line">
                        <span className="Label">Gesamtpreis:</span>
                        <span className="Value"><FormattedAmount lang="en" amount={product.price * product.quantity} currency={'€'} separator={','}/></span>
                    </span>
                </p>
            </div>
        );
    }
}

export default FetchDemo;
