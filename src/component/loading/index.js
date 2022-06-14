import React from 'react';
import Lottie from 'react-lottie';
import animationLoadingdata from "../../util/lottie/loading.json"


export const Loadingfunc = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoadingdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return <Lottie options={defaultOptions} height={100} width={100} />
}


export const LoadingIcon = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoadingdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return <Lottie options={defaultOptions} height={50} width={50} style={{padding:0}} />
}