import React from "react";
import styled from "styled-components";
import Currency from "../../util/currency/index";

const CarProductCatalog = (props) => {
  const { srcImage, displayText, watermark, degree, item } = props;

  return (
    <a
      href={
        item.shortened.shortened_full_url
          ? item.shortened.shortened_full_url
          : "#"
      }
      target={item.shortened.shortened_full_url ? "_blank" : null}
      style={{ cursor: "default" }}
    >
      <Card
        activeLink={
          item.shortened.shortened_full_url
            ? item.shortened.shortened_full_url
            : null
        }
      >
        <div className="wrap-image position-relative text-center">
          <ImageProduct src={srcImage} alt={srcImage} />
          {item?.catalogue_product_additional_json?.show_watermark === 1 ? (
            <Overlay degree={degree}>
              <h4>{watermark}</h4>
            </Overlay>
          ) : null}
        </div>
        {displayText ? (
          <ContentProduct>
            <Title>{item.catalogue_product_name}</Title>
            <div>{item.catalogue_product_additional_json.text}</div>
            {item.catalogue_product_discount_price ? (
              <React.Fragment>
                <Price discount>
                  {Currency.currency(item.catalogue_product_regular_price)}
                </Price>
                <PriceDiscount>
                  {Currency.currency(item.catalogue_product_discount_price)}
                </PriceDiscount>
              </React.Fragment>
            ) : (
              <PriceDiscount>
                {Currency.currency(item.catalogue_product_regular_price)}
              </PriceDiscount>
            )}
          </ContentProduct>
        ) : null}
      </Card>
    </a>
  );
};

export default CarProductCatalog;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  h4 {
    transform: ${({ degree }) =>
      degree ? `rotate(-45deg)` : "rotate(-45deg)"};
    font-weight: bold;
    font-size: 60pt;
    color: #fff;
    opacity: 0.5;
  }
`;

const PriceDiscount = styled.div`
  font-size: 15pt;
  font-weight: 600;
  @media (orientation: portrait) {
    font-size: 10pt;
  }
`;
const Price = styled.div`
  font-size: ${({ discount }) => (discount ? `10pt` : `15pt`)};
  font-weight: 600;
  ${({ discount }) =>
    discount
      ? `
    text-decoration: line-through;
    font-style: italic;
    `
      : null}

  @media (orientation: portrait) {
    font-size: ${({ discount }) => (discount ? `7pt` : `12pt`)};
  }
`;

const Title = styled.div`
  font-size: 15pt;
  font-weight: bold;
  @media (orientation: portrait) {
    font-size: 12pt;
  }
`;

const ContentProduct = styled.div`
  padding: 1rem;
`;

const ImageProduct = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.8rem;
  box-shadow: 0 8px 20px 0 rgb(0 0 0 / 20%);
  background-color: #fff;
  cursor: ${({ activeLink }) => (activeLink ? `pointer` : "default")};
`;

CarProductCatalog.defaultProps = {
  srcImage:
    "https://images.unsplash.com/photo-1586147210169-4f248d3a4696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
};
