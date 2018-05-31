import React, {Component} from "react";
import FormattedAmount from 'react-formatted-amount';
import './ProductBox.css';

class ProductBox extends Component {

    priceToCents(price){
        return price * 100;
    }

    render() {
        let product = this.props.product,
            clickFunc = this.props.clickFunc,
            drag = this.props.dragStart, dragStop = this.props.dragStop;

        return (
            <div className="ProductBox" onDrag={event => drag()} onDragEnd={event => dragStop()}
                 onClick={event => clickFunc(product)}>
                <p className="Title">
                    <strong>{product.title}</strong>
                </p>
                <p className="Content">
                    <span className="Line">
                        <span className="Label">Stückreis:</span>
                        <span className="Value"><FormattedAmount lang="en" amount={this.priceToCents(product.price)} currency={'€'} separator={','}/></span>
                    </span>
                    <span className="Line">
                        <span className="Label">Menge:</span>
                        <span className="Value">{product.quantity}</span>
                    </span>
                    <span className="Line">
                        <span className="Label">Gesamtpreis:</span>
                        <span className="Value"><FormattedAmount lang="en" amount={this.priceToCents(product.price * product.quantity)} currency={'€'} separator={','}/></span>
                    </span>
                </p>
            </div>
        );
    }
}

export default ProductBox;
