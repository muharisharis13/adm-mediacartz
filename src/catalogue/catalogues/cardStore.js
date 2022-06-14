import React from "react";
import styled from "styled-components";
import tokpedImg from "asset/logo/tokpedLogo.png";
import shopeeLogo from "asset/logo/shopeeLogo.png";
import igLogo from "asset/logo/igLogo.png";
import fbLogo from "asset/logo/fbLogo.png";
import twitterLogo from "asset/logo/twitterLogo.webp";
import telegramLogo from "asset/logo/telegramLogo.webp";
import ytLogo from "asset/logo/ytLogo.png";
import tiktokLogo from "asset/logo/tiktokLogo.webp";
import linkedinLogo from "asset/logo/linkedinLogo.png";
import waLogo from "asset/logo/waLogo.png";
import LineLogo from "asset/logo/LineLogo.png";

const dataToko = [
  {
    img: tokpedImg,
    text: "Tokopedia Official Store",
    key: "tokopedia",
  },
  {
    img: shopeeLogo,
    text: "Shopee Official Store",
    key: "shopee",
  },
  {
    img: igLogo,
    text: "Instagram Official Store",
    key: "instagram",
  },
  {
    img: fbLogo,
    text: "Facebook Official Store",
    key: "facebook",
  },
  {
    img: twitterLogo,
    text: "Twitter Official Store",
    key: "twitter",
  },
  {
    img: telegramLogo,
    text: "Telegram Official Store",
    key: "telegram",
  },
  {
    img: ytLogo,
    text: "Youtube Official Store",
    key: "youtube",
  },
  {
    img: tiktokLogo,
    text: "Tiktok Official Store",
    key: "tiktok",
  },
  {
    img: linkedinLogo,
    text: "LinkedIn Official Store",
    key: "linkedin",
  },
  {
    img: waLogo,
    text: "Whatsapp Official Store",
    key: "whatsapp",
  },
  {
    img: LineLogo,
    text: "Line Official Store",
    key: "line",
  },
  {
    img: null,
    text: "Email Us",
    key: "email",
  },
];

const CardStore = (props) => {
  const { item } = props;

  const FilterTokoFunc = (itemData) => {
    return dataToko.find((filter) => filter.key === itemData)?.img;
  };

  if (FilterTokoFunc(item.catalogue_product_name)) {
    return (
      <ContainerCard className="d-flex align-items-center justify-content-center flex mb-3">
        <a
          href={item.shortened?.shortened_full_url}
          target="_blank"
          className="d-flex align-items-center"
        >
          {FilterTokoFunc(item.catalogue_product_name) ? (
            <Logo
              src={FilterTokoFunc(item.catalogue_product_name)}
              alt={FilterTokoFunc(item.catalogue_product_name)}
              className="logo"
            />
          ) : null}
          <TextTitle className="text">
            {item.catalogue_product_additional_json?.label}
          </TextTitle>
        </a>
      </ContainerCard>
    );
  } else {
    return null;
  }
};

export default CardStore;

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
