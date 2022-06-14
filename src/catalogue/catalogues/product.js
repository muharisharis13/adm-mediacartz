import React from "react";
import CardProductCatalog from "./card";
import styled from "styled-components";
import { generatorColor } from "../../util";

const Product = (props) => {
  const {
    watermark,
    watermark_degree,
    tagline,
    tagline_color,
    listData,
    display,
    background,
    show_content,
  } = props;

  return (
    <React.Fragment>
      <Container background={background}>
        <section className="py-4">
          <div
            style={{ color: tagline_color }}
            dangerouslySetInnerHTML={{ __html: tagline }}
          ></div>
          <div className="mt-3">
            {display === "grid" ? (
              <div className="row">
                {listData.map((item, idx) => (
                  <div key={idx} className="col-md-6 mb-4 col-sm-12">
                    <CardProductCatalog
                      displayText={show_content === 1 ? true : false}
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
                {listData.map((item, idx) => (
                  <div key={idx} className="col-12 mb-4">
                    <CardProductCatalog
                      displayText={show_content === 1 ? true : false}
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
        </section>
      </Container>
    </React.Fragment>
  );
};

export default Product;

const Container = styled.div`
  background-color: ${({ background }) => (background ? background : "#fff")};
`;
