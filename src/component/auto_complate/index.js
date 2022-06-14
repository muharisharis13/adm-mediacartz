import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export const PlacesAutocomplete1 = ({ value, handleOnchange, ref }) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      selectProps={{
        onChange: handleOnchange,
        value,
      }}
      ref={ref}
    />
  );
};
