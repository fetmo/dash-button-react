import React, {Component} from "react";
import axios from "axios/index";
import ProductBox from '../ProductBox/ProductBox';
import './ProductContainer.css';

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
            <div className="ProductContainer">
                <h1 className="Title">{`Produkte`}</h1>
                <div>
                    {this.state.products.map(product =>
                        <ProductBox product={product} />
                    )}
                </div>
            </div>
        );
    }
}

export default FetchDemo;