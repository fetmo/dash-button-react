import React, {Component} from "react";
import axios from "axios/index";
import ProductBox from '../ProductBox/ProductBox';
import ModalProduct from "../ModalProduct/ModalProduct";

import Slider from 'react-slick';
import {Modal} from 'react-overlays';

import './ProductContainer.css';

class ProductContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            showModal: false
        };
    }

    componentDidMount() {
        setInterval(() => {
            console.log('Refresh');
            console.log(Date.now());
            this.fetchProducts()
        }, 5 * 60 * 1000);
        this.fetchProducts();
    }

    fetchProducts() {
        this.authButton().then(token => this.loadProducts(token));
    }

    loadProducts(token) {
        let products = this.getProducts(token);

        products.then(data => {
            if(typeof data !== 'undefined'){
                this.setState({products: data});
            }
        });
    }

    async getProducts(token) {
        return await axios.get(`${this.props.baseUrl}DashButton/getProduct`, {
            params: {
                token: token
            },
        }).then(res => {
            let product = res.data.product;

            if (!Array.isArray(product) && typeof product !== 'undefined') {
                product = [product];
            }

            return product
        });
    }

    async authButton() {
        return await axios.get(`${this.props.baseUrl}DashAuthentication/authToken`, {
            params: {
                buttoncode: `${this.props.buttoncode}`
            },
        }).then(res => {
            return res.data.token;
        });
    }

    async triggerClick(token, identifier) {
        return await axios.post(`${this.props.baseUrl}DashButton/triggerClick`, {
            token: token,
            identifier: identifier
        }).then(res => {
            return res.data;
        })
    }

    onBuyClick(product) {
        let identifier = product.identifier,
            me = this;

        this.authButton().then(token => {
            me.triggerClick(token, identifier).then(response => {
                let message = <div className="ModalProduct">
                    <h3>Anfrage wurde {response.success ? '' : 'nicht'} erfolgreich an den Shop geschickt!</h3>
                </div>;

                setTimeout(() => me.closeModal(), 1500);
                me.setState({message: message, modalProduct: false});
            })
        });
    }

    onBoxClick(product) {
        let identifier = product.identifier,
            me = this, modalProduct;

        if (me.state.dragging) {
            return;
        }

        this.authButton().then(token => {
            me.getProducts(token).then(products => {
                products.forEach((el) => {
                    if (el.identifier === identifier) {
                        modalProduct = el;
                    }
                });

                me.setState({modalProduct: modalProduct});
                this.openModal();
            });
        })
    }

    onDragStart() {
        this.setState({dragging: true});
    }

    onDragStop() {
        setTimeout(() => {
            this.setState({dragging: false});
        }, 1500);
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false, message: null});
    }

    closeTab() {
        if (window.confirm('Fenster schließen?')) {
            window.close();
        }
    }

    render() {

        let sliderSettings = {
                dots: true,
                infinite: true,
                autoplay: false,
                swipeToSlide: true,
                slidesToShow: 1,
                onSwipe: () => {
                    this.onDragStart();
                    this.onDragStop();
                }
            },
            modalProduct = '';

        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };

        const backdropStyle = {
            ...modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };

        if (this.state.modalProduct) {
            modalProduct = <ModalProduct product={this.state.modalProduct} buy={this.onBuyClick.bind(this)}/>;
        }

        if (this.state.message) {
            modalProduct = this.state.message;
        }

        return (
            <div className="ProductContainer">
                <button className="CloseWindow" onClick={this.closeTab}>X</button>
                <h1 className="Title">{`Produkte`}</h1>
                <div className="clearfix SliderBox">
                    {this.state.products
                        ?
                        <Slider {...sliderSettings}>
                            {this.state.products.map(product =>
                                <ProductBox key={product.id} product={product}
                                            clickFunc={this.onBoxClick.bind(this)}/>
                            )}
                        </Slider>
                        : ''}
                    {modalProduct
                        ?
                        <Modal
                            style={modalStyle}
                            backdropStyle={backdropStyle}
                            show={this.state.showModal}
                            onHide={this.closeModal.bind(this)}>
                            {modalProduct}
                        </Modal>
                        : ''
                    }
                </div>
            </div>
        );
    }
}

export default ProductContainer;
