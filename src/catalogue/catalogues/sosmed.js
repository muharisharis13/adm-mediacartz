import React from "react";
import Card from "./cardStore";

const sosmed = (props) => {
  const { listData, text, text_color } = props;

  return (
    <React.Fragment>
      <section className="py-3">
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ color: text_color }}
        />

        <div className="mt-3">
          {listData?.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default sosmed;
