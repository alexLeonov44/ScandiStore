import React from 'react';
import AddTocartButton from './AddTocartButton';
import SelectedProductAttributes from './SelectedProductAttributes';

export default function SelectedProductOptions({
  productBrand,
  productName,
  attributes,
  activeAttributes,
  setActiveAttribute,
  description,
  selectedCurrency,
  currencySymbols,
  prices,
  addToCart,
  inStock,
}) {
  const { amount } = prices.find((price) => price.currency === selectedCurrency);
  const [attributesAlert, setAttributesAlert] = React.useState(false);
  const attributeKeys = Object.keys(activeAttributes);

  const addToCartOnClick = () => {
    if (attributeKeys.length === attributes.length) {
      addToCart();
    } else {
      setAttributeAlert();
    }
  };
  const setAttributeAlert = () => {
    let timerId = setInterval(() => setAttributesAlert((prev) => !prev), 400);
    setTimeout(() => {
      clearInterval(timerId);
      setAttributesAlert(false);
    }, 2000);
  };

  return (
    <div className="options" style={{ width: '293px' }}>
      <div className="options__name-block">
        <h3>{productBrand}</h3>
        <h4>{productName}</h4>
      </div>
      {!!attributes.length && (
        <SelectedProductAttributes
          attributes={attributes}
          activeAttributes={activeAttributes}
          setActiveAttribute={setActiveAttribute}
          attributesAlert={attributesAlert}
          attributeKeys={attributeKeys}
          attributesAlert={attributesAlert}
        />
      )}
      <div className="options__price-block">
        <span>PRICE:</span>
        <br />
        <i>{currencySymbols[selectedCurrency]}</i>
        <span>{amount}</span>
      </div>
      <AddTocartButton
        addToCartOnClick={addToCartOnClick}
        attributeKeys={attributeKeys}
        attributes={attributes}
        inStock={inStock}
      />
      <div className="options__description-block">{description}</div>
    </div>
  );
}