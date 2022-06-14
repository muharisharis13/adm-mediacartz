import React from "react";
import { color, Text } from "../../../component/1.LANDINGPAGE/style";
import { Card } from "../../../component/1.LANDINGPAGE";
import styled from "styled-components";
import {
  IconSmile,
  IconTrendingUp,
  IconUsers,
  IconCreate,
  IconComany,
} from "../../../asset";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const image_client = [
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712408/Grab_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/ismaya_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/electronic-solution_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/erafone_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/ibis_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/idi.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712410/samsung_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712408/doss_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/intercontinental_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712409/k-vision_logo.png",
  "https://res.cloudinary.com/nomadic-id/image/upload/v1585712408/debenhams_logo.png",
];

const Arrbanner = [
  {
    icon: IconSmile,
    number: 22,
    name: "Partners",
  },
  {
    icon: IconTrendingUp,
    number: "+14541K",
    name: "Impressions",
  },
  {
    icon: IconUsers,
    number: 347,
    name: "Users",
  },
  {
    icon: IconCreate,
    number: 869,
    name: "Campaigns",
  },
  {
    icon: IconComany,
    number: 584,
    name: "Companies",
  },
];

const say_about = [
  {
    title: "CEO & CO-FOUNDER TOKOCRYPTO",
    content:
      "Deepest and heartful thanks to Mediacartz for powering Tokocrypto, ensuring and making sure that all of our services are smooth and lancar. Terima kasih banyak dan salam to the moon.",
    image: "https://mediacartz.com/assets/img/v2/testimoni-tokocrypto.jpeg",
    name: "Pang Xue Kai",
  },
  {
    title: "VICE PRESIDENT PANIN BANK",
    content:
      "Bekerja sama dengan Mediacartz dalam memasarkan salah satu produk dari usaha kami adalah pilihan yang tepat. Selain membantu kami dalam ekspansi usaha, juga tingkat responsif pelayanan yang sangat mudah, cepat, dan kooperatif. Harapan kami, usaha kami akan berkembang dengan cepat Bersama dengan mediacartz. Maju Terus!",
    image: "https://mediacartz.com/assets/img/v2/testimoni-paninbank.jpeg",
    name: "Erick Ong",
  },
  {
    title: "KHAIROS CHAIRMAN",
    content:
      "Khairos merasa sangat terbantu dengan adanya layanan SMS Broadcast dari Mediacartz. Langkah-langkah untuk menggunakannya juga sangat mudah.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    name: "Martha",
  },
];

export const OurClient = () => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "inset( 0 -100vw -100vw 0 )",
        }}
      >
        <Container>
          <ContainerSection1>
            <div
              style={{
                marginBottom: "80px",
                paddingTop: "40px",
                position: "relative",
              }}
            >
              <Text.DISPLAY_L style={{ color: color.PRIMARY_10 }}>
                Platform Pemasaran dan Pemasangan Iklan Pertama di Indonesia
              </Text.DISPLAY_L>
            </div>
            <div style={{ position: "relative" }}>
              <ContainerBanner>
                {Arrbanner.map((item, idx) => (
                  <ContainerItemsBanner key={idx}>
                    <div>
                      <img src={item.icon} alt="" />
                    </div>
                    <DivContainerAngkaBanner style={{ marginTop: "18px" }}>
                      <Text.HEADING_L
                        style={{
                          color: color.PRIMARY_100,
                          wordBreak: "break-word",
                        }}
                      >
                        {item.number}
                      </Text.HEADING_L>
                    </DivContainerAngkaBanner>
                    <div style={{ marginTop: "16px" }}>
                      <Text.SUBHEADING_M style={{ color: color.PRIMARY_100 }}>
                        {item.name}
                      </Text.SUBHEADING_M>
                    </div>
                  </ContainerItemsBanner>
                ))}
              </ContainerBanner>
            </div>
          </ContainerSection1>

          <ContainerSection2 style={{ marginTop: "190px" }}>
            <div style={{ marginBottom: "192px" }}>
              <Text.DISPLAY_M style={{ color: color.PRIMARY_30 }}>
                What our clients say about Mediacartz
              </Text.DISPLAY_M>
            </div>
          </ContainerSection2>
        </Container>

        <div
          className="d-flex"
          style={{
            alignItems: "baseline",
            justifyContent: "space-evenly",
            width: "87vw",
            position: "absolute",
            bottom: "-350px",
          }}
        >
          {say_about.map((item, idx) => (
            <div key={idx}>
              <Card.Testimonials
                title={item.title}
                content={item.content}
                img_profile={item.image}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </div>

      <ContainerSection1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "520px",
          flexDirection: "column",
        }}
      >
        <div>
          <Text.DISPLAY_M style={{ color: color.PRIMARY_150 }}>
            Our Clients
          </Text.DISPLAY_M>
        </div>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <OwlCarousel
            loop
            center
            autoWidth
            autoplay
            style={{ margin: "0 10vw" }}
          >
            {image_client.map((item, idx) => (
              <div
                className="item"
                key={idx}
                style={{ marginRight: "10px !important" }}
              >
                <img
                  style={{ width: "150px", filter: "grayscale(100%)" }}
                  src={item}
                  alt={item}
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </ContainerSection1>
    </div>
  );
};

const ContainerSection2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10vw;
  flex-direction: column;
  position: relative;
`;

const DivContainerAngkaBanner = styled.div`
  height: auto;
  width: 210px;
  padding: 5px;
  border-radius: 8px;
  background: ${color.PRIMARY_10};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-wrap: wrap;

  @media (max-width: 1366px) {
    width: 180px;
  } ;
`;

const ContainerItemsBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContainerBanner = styled.div`
  background-color: ${color.NEUTRAL_0};
  padding: 34px 27px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ContainerSection1 = styled.section`
  padding: 0px 10vw;
`;

const Container = styled.div`
  background-image: ${color.COLOR_GRADIENT_02};
  clip-path: ellipse(300% 100% at -55% 0%);
`;
