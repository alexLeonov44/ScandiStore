import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import SelectedProductImages from '../pages/SelectedProductOveriew/SelectedProductImages'
import SelectedProductOptions from '../pages/SelectedProductOveriew/SelectedProductOptions'


import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

import {  withRouter } from 'react-router-dom';
import { addProductToCart } from '../redux/actions/cart';

const TARCKS = gql`
query Query($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency
      amount
    }
    brand
  }
}`

class SelectedProductOveriew extends React.Component {

    state={}
    setActiveAttribute=(key,val)=>{
      this.setState(state=>({
        [key]:val
      }))
      
    }
    addToCart=()=>{
      const product = this.props.data.product
       const selectedProduct = {
        id:product.id,
        attributes:Object.entries(this.state).map(([name, value]) =>({name,value})),
        brand:product.brand,
        name:product.name,
        prices:product.prices,
        gallery:product.gallery,
        count:1
       }
        this.props.addProductToCart(selectedProduct) 
       
    }
    render(){
        const {selectedCurrency,currencySymbols} = this.props
        const {product} = this.props.data
  
        if(!product) return '......'
        return (
            <div className="selectedProduct">
                <SelectedProductImages  gallery={product.gallery}
                 setSelectedImage={this.setSelectedImage} selectedImage={this.state.selectedImage} />
                <SelectedProductOptions productBrand={product.brand} productName={product.name} attributes={product.attributes}
                activeAttributes={this.state} inStock={product.inStock}
                 setActiveAttribute={this.setActiveAttribute} description={product.description}
                selectedCurrency={selectedCurrency} currencySymbols={currencySymbols} prices={product.prices} addToCart={this.addToCart}/>
            </div>
        )
    }
    }
    
const mapStateToProps=(state)=>({
  selectedCurrency:state.header.selectedCurrency,
  currencySymbols:state.header.currencySymbols
})
const gqOptions = {
  options: props => ({
    variables: {
      "productId": props.match.params.productId
    },
  }),
}


export default compose(
  connect(mapStateToProps, 
  { addProductToCart}),withRouter,graphql(TARCKS,gqOptions))(SelectedProductOveriew)