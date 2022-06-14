import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import PropTypes from "prop-types"


const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const {Handle} = Slider;



export const IdxSlider_range = ({min,max,defaultValue, onChange}) => {
  return (
    <div>
      <Range min={min} max={max} defaultValue={defaultValue}   marks={{ [min]: min,  [max]: max }} onChange={onChange} allowCross={false} railStyle={{backgroundColor:"#dddddd"}} dotStyle={{borderColor: '#c8c8c9',backgroundColor: '#eeeeee',}} />
    </div>
  )
}

IdxSlider_range.defaultProps = {
  min:20,
  max:80,
  defaultValue:[20,59]
}

IdxSlider_range.propTypes = {
  min : PropTypes.number.isRequired,
  max : PropTypes.number.isRequired,
  defaultValue: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
