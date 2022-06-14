import React from "react";
import * as Component from "../../../../component";
import * as Util from "../../../../util";
import styled from "styled-components";
import * as Style from "../../../../component/style/content/default";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ModalDetailProduk = (props) => {
  const { show, onHide, data } = props;

  return (
    <Component.Modal_Component
      size="lg"
      title="Detail Produk"
      onHide={onHide}
      show={show}
    >
      <div className="container">
        <div className="wrap-image mb-5">
          <OwlCarousel className='owl-theme' autoplay loop items={1} margin={10}>
            {
              data?.item_image?.map((item, index) => (
                <div key={index} className="item d-flex flex-column align-items-center">
                  <img src={item} style={{height:240, width:'auto', alignSelf:'center'}}/>
                </div>
              ))
            }
          </OwlCarousel>
        </div>
        <div className="container">
          <Row className="row bg-white">
            <div className="col-md-4 col-sm-4">
              <strong style={{ color: Style.COLOR_SECONDARY }}>Nama Produk</strong>
            </div>
            <div className="col-md-8 col-sm-8">
              {data.item_name}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-4 col-sm-4">
              <strong style={{ color: Style.COLOR_SECONDARY }}>SKU</strong>
            </div>
            <div className="col-md-8 col-sm-8">
              {data.item_sku}
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-4 col-sm-4">
              <strong style={{ color: Style.COLOR_SECONDARY }}>Harga</strong>
            </div>
            <div className="col-md-8 col-sm-8">
              {Util.FormatCurrency.currency(data.item_regular_price)}
            </div>
          </Row>
          {
            data.item_discount_price &&
            <Row className="row bg-white">
              <div className="col-md-4 col-sm-4">
                <strong style={{ color: Style.COLOR_SECONDARY }}>Harga Setelah Diskon</strong>
              </div>
              <div className="col-md-8 col-sm-d">
                {Util.FormatCurrency.currency(data.item_discount_price)}
              </div>
            </Row>
          }
          <Row className="row bg-white">
            <div className="col-md-4 col-sm-4">
              <strong style={{ color: Style.COLOR_SECONDARY }}>Deskripsi</strong>
            </div>
            <div className="col-md-8 col-sm-8">
              <div dangerouslySetInnerHTML={{ __html: data.item_description }} />
            </div>
          </Row>
          <Row className="row bg-white">
            <div className="col-md-4 col-sm-4">
              <strong style={{ color: Style.COLOR_SECONDARY }}>Status</strong>
            </div>
            <div className="col-md-8 col-sm-8">
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: Util.displayStatus(
                      data.item_active_status_name
                    ),
                  }}
                />
              }
            </div>
          </Row>
        </div>
      </div>
    </Component.Modal_Component>
  );
};

export default ModalDetailProduk;

const Row = styled.div`
border:1px solid transparent;
border-bottom-color:#ccc;
padding:5px 5px;



&:last-child{
  border-bottom-color: transparent;
}
`
