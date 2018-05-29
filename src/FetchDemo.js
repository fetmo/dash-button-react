import React, {Component} from "react";
import axios from "axios/index";
import FormattedAmount from 'react-formatted-amount';


class FetchDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get(`${this.props.baseUrl}DashAuthentication/authToken`, {
            params: {
                buttoncode: 'asdf123'
            },
        }).then(res => {
            this.loadProducts(res.data.token);
        });
    }

    loadProducts(token) {
        axios.get(`${this.props.baseUrl}DashButton/getProduct`, {
            params: {
                token: token
            },
        }).then(res => {
            let product = res.data.product;

            if (!Array.isArray(product)) {
                product = [product];
            }

            this.setState({products: product});
        });
    }

    render() {
        return (
            <div>
                <h1>{`Produkte`}</h1>
                <ul>
                    {this.state.products.map(product =>
                        <li key={product.id}>
                            {product.title} (Identifier: {product.identifier}):
                            <FormattedAmount lang="en" amount={product.price} currency={'€'}/>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default FetchDemo;
