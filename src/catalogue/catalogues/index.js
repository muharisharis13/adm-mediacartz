import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowUpCircleFill } from "@styled-icons/bootstrap";
import * as Services from "../../service";
import * as Util from "../../util";
import Banner from "./banner";
import Promo from "./promo";
import Sosmed from "./sosmed";
import Header from "./header";
import Product from "./product";
import Footer from "./footer";
import About from "./aboutUs";
import MarketPlace from "./marketPlace";

const api = Services.Method;

const ProductType = {
  banner: "BANNER",
  promo: "PROMO",
  product: "PRODUCT",
  social_media: "SOCIAL_MEDIA",
};

export default function Catalogues(props) {
  const [data, setData] = useState({});
  const [positionCatalog, setPositionCatalog] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { match } = props;

  Util.useTitle(`Catalog ${match?.params?.slug}`);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  window.addEventListener("scroll", handleScroll);

  const GetData = async () => {
    console.log(`catalogue/slug/${match?.params?.slug}`);
    if (match?.params?.slug) {
      await Promise.all([
        api
          .get(`/catalogue/slug/${match?.params?.slug}`)
          .then((res) => {
            console.log("ni res", res.data);
            if (res?.data?.success) {
              setData(res?.data?.data);
              setPositionCatalog(
                res?.data?.data?.catalogue_product_type_position
              );
            }
          })
          .catch((err) => alert(`${err?.message}`)),
      ]);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const generateProductByType = (type) => {
    return data?.catalogue_product?.filter(
      (filter) => filter.catalogue_product_type === type
    );
  };

  // console.log(generateProductByType("BANNER"));

  return (
    <Container>
      {positionCatalog.map((item, idx) => {
        if (item.catalogue_product_type === "HEADER") {
          return (
            <Header
              backgroundColor={item?.background}
              text={item?.text}
              text_color={item?.text_color}
              image={data?.catalogue_image}
              key={idx}
            />
          );
        } else if (item.catalogue_product_type === "BANNER") {
          return (
            <Banner
              listProduct={generateProductByType(item.catalogue_product_type)}
              backgroundColor={item.background}
              key={idx}
            />
          );
        } else if (item.catalogue_product_type === "CONTENT") {
          return (
            <About
              backgroundColor={item.background}
              text_color={item.text_color}
              title={item.title}
              text={item.text}
              key={idx}
            />
          );
        } else if (item.catalogue_product_type === "MARKETPLACE") {
          return (
            <MarketPlace
              background={item.background}
              text={item.text}
              text_color={item.text_color}
              key={idx}
              listData={generateProductByType(item.catalogue_product_type)}
            />
          );
        } else if (item.catalogue_product_type === "SOCIAL_MEDIA") {
          return (
            <Sosmed
              text={item.text}
              text_color={item.text_color}
              listData={generateProductByType(item.catalogue_product_type)}
              key={idx}
            />
          );
        } else if (item.catalogue_product_type === "PROMO") {
          return (
            <Promo
              display={item.display}
              show_content={item.show_content}
              background={item.background}
              tagline={item.tagline}
              tagline_color={item.tagline_color}
              watermark={item.watermark}
              watermark_degree={item.watermark_degree}
              listProduct={generateProductByType(item.catalogue_product_type)}
              key={idx}
            />
          );
        } else if (item.catalogue_product_type === "PRODUCT") {
          return (
            <Product
              watermark={item.watermark}
              watermark_degree={item.watermark_degree}
              tagline={item.tagline}
              tagline_color={item.tagline_color}
              display={item.display}
              background={item.background}
              show_content={item.show_content}
              listData={generateProductByType(item.catalogue_product_type)}
              key={idx}
            />
          );
        }
      })}

      <div style={{ paddingTop: "70px" }}>
        <Footer />
      </div>

      {/* to top */}

      {scrollPosition >= 1000 && (
        <button
          className="btn"
          style={{
            bottom: "100px",
            right: "50px",
            position: "fixed",
            color: "#ffff",
          }}
          onClick={() => window.scrollTo(0, 0, "smooth")}
        >
          <ArrowUpCircleFill width={50} />
        </button>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  section {
    width: 42rem;
    margin: auto;
  }

  @media (orientation: portrait) {
    section {
      width: auto;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`;
