import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "500",
  },
  {
    value: 50,
    label: "1000",
  },
  {
    value: 75,
    label: "1500",
  },
  {
    value: 100,
    label: "2000+",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function DiscreteSliderValues() {
  return (
    <Slider
      sx={{ width: 200 }}
      aria-label="Restricted values"
      defaultValue={20}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      step={null}
      valueLabelDisplay="auto"
      marks={marks}
    />
  );
}
