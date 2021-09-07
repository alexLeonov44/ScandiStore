import Header from './components/Header';
import ProductsOverview from './components/ProductsOverview';
import SelectedProductOveriew from './components/SelectedProductOveriew';
import Cart from './components/Cart';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThumbnailCart from './components/ThumbnailCart';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const { isThumbnailCartOpen } = this.props;
    return (
      <div className="wrapper">
        <Header />
        {isThumbnailCartOpen && <ThumbnailCart />}
        <Route exact path="/" render={() => <ProductsOverview />} />
        <Route exact path="/product/:productId" render={() => <SelectedProductOveriew />} />
        <Route exact path="/cart" render={() => <Cart />} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isThumbnailCartOpen: state.header.isThumbnailCartOpen,
  };
};
export default connect(mapStateToProps)(App);
