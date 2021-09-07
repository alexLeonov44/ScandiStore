import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductItemCard from '../pages/product/ProductItemCard';

import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

import {Link,withRouter} from "react-router-dom";

const TARCKS = gql`
query Query($categoryInput: CategoryInput) {
  category(input: $categoryInput) {
    name
    products {
      name
      id
      inStock
      gallery
      category
      prices {
        currency
        amount
      }
      brand
    }
  }
}, 
`
class ProductsOverview extends React.Component {
 
  render() {
      const {category,id} = this.props.data
      const {selectedCurrency,currencySymbols,purchases} = this.props 

      if(!this.props.data.category) return '......'
    return (
        <div className="products">
            <div className="products__category-name">
              <h1>{category.name}</h1>  
            </div>
            {
                category?.products.map((product,i)=>(
                  <Link key={product.id + i} to={`/product/${product.id}`}>  <ProductItemCard key={product.id + i} product={product} selectedCurrency={selectedCurrency}
                     currencySymbols={currencySymbols} purchases={purchases}  /> </Link>
                ))
            }
           
        </div>
    ) 
  }
}

const mapStateToProps=(state)=>({
  selectedCategory:state.header.selectedCategory,
  selectedCurrency:state.header.selectedCurrency,
  currencySymbols:state.header.currencySymbols,
  purchases:state.cart.purchases
})
   
const gqOptions = {
  options: props => ({
    variables: {
      "categoryInput": {
        "title": props.selectedCategory
      }
    },
  })
}

export default compose(
  connect(mapStateToProps),withRouter,graphql(TARCKS,gqOptions))(ProductsOverview)