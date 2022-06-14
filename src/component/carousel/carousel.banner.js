import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import {
  ChevronCompactLeft,
  ChevronCompactRight,
} from "@styled-icons/bootstrap";

export const CarouselBanner = (props: { ArrImage: Array }) => {
  const [current, setCurrent] = useState(0);
  const length = props.ArrImage?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    let timer1 = setTimeout(
      () => setCurrent(current === length - 1 ? 0 : current + 1),
      5000
    );
    return () => {
      clearTimeout(timer1);
    };
  });

  if (!Array.isArray(props.ArrImage) || props.ArrImage?.length <= 0) {
    return null;
  }

  return (
    <Container>
      <button className="left-arrow" onClick={prevSlide}>
        <ChevronCompactLeft />
      </button>
      <button className="right-arrow" onClick={nextSlide}>
        <ChevronCompactRight />
      </button>
      {props.ArrImage?.map((item, idx) => {
        return (
          <Slide active={idx === current ? true : false} key={idx}>
            {idx === current && <img className="image" src={item} alt={item} />}
          </Slide>
        );
      })}
    </Container>
  );
};

const Slide = styled.div`
  transition-duration: 1s ease;
  transition-duration: 1s;
  transform-origin: 0% 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `};

  img {
    width: 800px;
    object-fit: cover;
    height: 300px;
  }
  .subheading {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: #fff;
  }
`;

const Container = styled.section`
  position: relative;
  min-height: 300px;
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .left-arrow {
    position: absolute;
    top: calc(300px / 50%);
    left: 32px;
    font-size: 1.2rem;
    border: none;
    font-weight: 800;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    opacity: 0.5;
    transition: 300ms;
    &:hover {
      opacity: 1;
    }
  }

  .right-arrow {
    position: absolute;
    top: calc(300px / 50%);
    right: 32px;
    font-size: 1.2rem;
    border: none;
    font-weight: 800;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    opacity: 0.5;
    transition: 300ms;
    &:hover {
      opacity: 1;
    }
  }
`;

CarouselBanner.defaultProps = {
  ArrImage: [],
};

CarouselBanner.propTypes = {
  ArrImage: PropTypes.array.isRequired,
};
