import React from "react";
import styled from "styled-components";
import CardProductCatalog from "./card";

const Image = [
  "https://images.unsplash.com/photo-1610541756109-33b81610a402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1543079676-9cab90cbe629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1444&q=80",
];
const Promo = (props) => {
  const {
    listProduct,
    display,
    show_content,
    background,
    tagline,
    tagline_color,
    watermark,
    watermark_degree,
  } = props;

  return (
    <div
      className=" py-4"
      style={{ background: background ? background : "#fff" }}
    >
      <section>
        <div className="mb-3">
          {display === "grid" ? (
            <div className="row">
              {listProduct.map((item, idx) => (
                <div key={idx} className="col-md-6 col-sm-12 mb-4">
                  <CardProductCatalog
                    displayText={false}
                    degree={watermark_degree}
                    watermark={watermark}
                    item={item}
                    srcImage={item.catalogue_product_image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {listProduct.map((item, idx) => (
                <div key={idx} className="col-12 mb-4">
                  <CardProductCatalog
                    displayText={false}
                    degree={watermark_degree}
                    watermark={watermark}
                    item={item}
                    srcImage={item.catalogue_product_image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-white">
          <div
            style={{ color: tagline_color ? tagline_color : "#000" }}
            dangerouslySetInnerHTML={{ __html: tagline }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Promo;

// const Card = styled.div`
//   background-color: #fff;
//   overflow: hidden;
//   box-shadow: 0 8px 20px 0 rgb(0 0 0 / 20%);
//   border-radius: 0.8rem;

//   .susbtext {
//     padding: 10px;
//     text-align: center;

//     .text {
//       font-weight: 700;
//       font-size: 14pt;
//       text-transform: uppercase;
//     }
//   }
// `;

// const ImageProduct = styled.img`
//   width: 100%;
//   height: 400px;
//   object-fit: cover;
// `;
