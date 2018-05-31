import React, {Component} from "react";
import FormattedAmount from 'react-formatted-amount';
import './ModalProduct.css';

class ModalProduct extends Component {

    priceToCents(price){
        return price * 100;
    }

    render() {
        let product = this.props.product,
            clickFunc = this.props.buy;

        return (
            <div className="ModalProduct" id={product.id}>
                <p className="Title">
                    <strong>{product.title}</strong>
                </p>
                <p className="Content">
                    <span className="Line">
                        <span className="Label">Menge:</span>
                        <span className="Value">{product.quantity}</span>
                    </span>
                    <span className="Line">
                        <span className="Label">Gesamtpreis:</span>
                        <span className="Value"><FormattedAmount lang="en" amount={this.priceToCents(product.price * product.quantity)} currency={'€'} separator={','}/></span>
                    </span>
                    <button onClick={event => clickFunc(product)} >
                        Zahlungspflichtig bestellen
                    </button>
                </p>
            </div>
        );
    }
}

export default ModalProduct;
