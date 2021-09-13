import React from 'react';
import CategoryButton from '../pages/header/CategoryButton';
import backButton from '../assets/backButton.svg';
import cartCircle from '../assets/cartCircle.svg';

import cartButton from '../assets/cartButton.svg';
import CurrencyBlock from '../pages/header/CurrencyBlock';
import { connect } from 'react-redux';
import {
  getPurchasesAmount,
  getTotalPrice,
  setActiveCategory,
  setActiveCurrency,
  setThumbnailCartOpen,
} from '../redux/actions/header';

import { graphql } from '@apollo/client/react/hoc';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { HEADER_TARCKS } from '../gqlQueries';

class Header extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (
      this.props.purchases !== prevProps.purchases ||
      this.props.selectedCurrency !== prevProps.selectedCurrency
    ) {
      this.props.getPurchasesAmount(this.props.purchases);
      this.props.getTotalPrice(this.props.purchases);
    }
  }
  cartButtonOnClick() {}
  cartButtonRef = React.createRef();
  render() {
    const {
      purchasesAmount,
      selectedCategory,
      currencySymbols,
      setActiveCurrency,
      setActiveCategory,
      setThumbnailCartOpen,
      isThumbnailCartOpen,
      location,
      purchases,
    } = this.props;
    const { categories, currencies } = this.props.data;
    const cartBtnOnclick = () => {
      if (location.pathname === '/cart') {
        setThumbnailCartOpen(false);
      } else {
        setThumbnailCartOpen(!isThumbnailCartOpen);
      }
    };
    if (!selectedCategory && categories) setActiveCategory(categories[0].name);
    if (location.pathname === '/cart') setThumbnailCartOpen(false);
    return (
      <div className="header">
        <nav className="header__category" style={{ display: 'flex' }}>
          {categories?.length &&
            [...categories, { __typename: 'Category', name: 'all' }].map((category, i) => (
              <CategoryButton
                key={category + i}
                category={category}
                selectedCategory={selectedCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
        </nav>
        <div className="h-back-button">
          <Link to="/">
            <img src={backButton} alt="backButton"></img>
          </Link>
        </div>
        <nav className="h-right_side__block">
          <CurrencyBlock
            currencies={currencies}
            setActiveCurrency={setActiveCurrency}
            currencySymbols={currencySymbols}
            setThumbnailCartOpen={setThumbnailCartOpen}
          />
          <div onClick={cartBtnOnclick} ref={this.cartButtonRef} className="h-right_side__block__cart_button">
            <img  src={cartButton} alt="backButton"></img>
            {!!purchases.length && (
              <>
                <img
                  className="h-right_side__block__cart-circle"
                  src={cartCircle}
                  alt="cartCircle"
                />
                <span className="h-right_side__block__cart-circle-num">{purchasesAmount}</span>
              </>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedCategory: state.header.selectedCategory,
  currencySymbols: state.header.currencySymbols,
  purchasesAmount: state.header.purchasesAmount,
  isThumbnailCartOpen: state.header.isThumbnailCartOpen,
  purchases: state.cart.purchases,
  selectedCurrency: state.header.selectedCurrency,
});

export default compose(
  connect(mapStateToProps, {
    setActiveCategory,
    setActiveCurrency,
    setThumbnailCartOpen,
    getPurchasesAmount,
    getTotalPrice,
  }),
  withRouter,
  graphql(HEADER_TARCKS),
)(Header);
