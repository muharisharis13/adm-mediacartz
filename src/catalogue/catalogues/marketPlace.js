import React from "react";
import blibliLogo from "asset/logo/bliBliLogo.png";
import tokpedLogo from "asset/logo/tokpedLogo.png";
import shopeeLogo from "asset/logo/shopeeLogo.png";
import styled from "styled-components";

const dataToko = [
  {
    img: blibliLogo,
    text: "Blibli Official Store",
    key: "Blibli",
  },
  {
    img: tokpedLogo,
    text: "Tokopedia Official Store",
    key: "Tokopedia",
  },
  {
    img: shopeeLogo,
    text: "Tokopedia Official Store",
    key: "Shopee",
  },
];

const marketPlace = (props) => {
  const { background, text, text_color, listData } = props;

  const FilterTokoFunc = (itemData) => {
    return dataToko.find((find) => itemData.includes(find.key))?.img
      ? dataToko.find((find) => itemData.includes(find.key))?.img
      : null;
  };

  return (
    <div style={{ background: background }} className="py-2">
      <section>
        <div className="wrap-text text-center">
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            style={{ color: text_color }}
          />
        </div>
        <div className="mt-3">
          {listData.map((item, idx) => (
            <ContainerCard
              className="d-flex align-items-center justify-content-center flex mb-3"
              key={idx}
              style={{
                backgroundColor:
                  item.catalogue_product_additional_json.background,
                color: item.catalogue_product_additional_json.text_color,
              }}
            >
              <a
                href={item.shortened.shortened_full_url}
                target="_blank"
                className="d-flex align-items-center"
              >
                {/* <Logo
                  src={FilterTokoFunc(item.catalogue_product_name)}
                  alt={FilterTokoFunc(item.catalogue_product_name)}
                  className="logo"
                /> */}
                <TextTitle className="text">
                  {item.catalogue_product_name}
                </TextTitle>
              </a>
            </ContainerCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default marketPlace;

const TextTitle = styled.div`
  margin-left: 20px;
  font-weight: 600;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ContainerCard = styled.div`
  background-color: #fff;
  border: thin solid #dede;
  overflow: hidden;
  box-shadow: 0 8px 20px 0 rgb(0 0 0 / 20%);
  border-radius: 9999px;
  cursor: pointer;
  height: 50px;
`;
