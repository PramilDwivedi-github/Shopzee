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
  return `${value * 20}`;
}

export default function RangeSlider({
  setProductFilter,
  productFilter,
  checked,
}) {
  const [value, setValue] = React.useState([0, 25]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let x = newValue[0] * 20;
    let y = newValue[1] * 20;
    setProductFilter({ ...productFilter, cost: [x, y] });
  };
  React.useEffect(() => {
    if (checked === false) setValue([0, 25]);
  }, [checked]);
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        marks={marks}
        sx={{ marginLeft: "3vw" }}
      />
    </Box>
  );
}
