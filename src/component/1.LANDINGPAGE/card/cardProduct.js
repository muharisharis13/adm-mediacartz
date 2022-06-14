import React from "react";
import * as Util from "../../../util";
import styled from "styled-components";
import * as Style from "../../../component/style/content/default";
import { Create } from "@styled-icons/ionicons-outline";

const CardProduct = (props: { menu: any, onClickDetail: Function }) => {
  const { menu, onClickDetail } = props;
  return (
    <Container className="card">
      <div className="image">
        <img src={menu?.item_image[0]} alt={menu?.item_name} />
        <div className="badge-angka">
          Stock : {Util.FormatCurrency?.input(menu?.menu_current_quantity)}
        </div>
      </div>
      <div className="title p-2">{menu?.item_name}</div>
      {menu?.discount_price && (
        <div className="discount-price">
          {Util.FormatCurrency.currency(menu?.regular_price)}
        </div>
      )}
      <div className="price">
        {menu?.discount_price
          ? Util.FormatCurrency.currency(menu?.discount_price)
          : Util.FormatCurrency.currency(menu?.regular_price)}
      </div>

      {/* buat hover */}
      <div className="container-hover d-flex justify-content-center align-items-center">
        <Create width={25} cursor="pointer" onClick={onClickDetail} />
      </div>
    </Container>
  );
};

export default CardProduct;

const Container = styled.div`
  /* CSS hover */

  .discount-price {
    text-decoration: line-through;
    font-style: italic;
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 10pt;
  }
  .price {
    margin-bottom: 5px;
    font-weight: 700;
    color: ${Style.COLOR_COKLAT};
  }
  .image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
    position: relative;
    &:hover ~ .container-hover {
      bottom: 0;
    }
    img {
      width: 100%;
    }
    .badge-angka {
      background-color: green;
      color: #fff;
      position: absolute;
      /* width: 80px; */
      bottom: 2px;
      border-top-right-radius: 10px;
      font-weight: 400;
      font-size: 13px;
      letter-spacing: 1px;
      padding: 2px 7px;
    }
  }

  .title {
    font-weight: 600;
    font-size: 12pt;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  .container-hover {
    position: absolute;
    height: 110px;
    /* border: thin solid #ccc; */
    padding: 5px;
    width: 100%;
    bottom: -110px;
    left: 0;
    background-color: #fff;
    transition: 250ms;
    &:hover {
      bottom: 0;
    }
  }
  position: relative;
  overflow: hidden;
`;
