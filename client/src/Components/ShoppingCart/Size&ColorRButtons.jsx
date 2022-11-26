import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function RadioButtonsColorGroup({ color, handleColor }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose a color:{" "}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleColor}
      >
        {color.split(",").map((color, index) => (
          <FormControlLabel
            key={index}
            value={color}
            control={<Radio />}
            label={color.toUpperCase()}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
export function RadioButtonsSizeGroup({ size, handleSize }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Choose your size:{" "}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleSize}
      >
        {size.split(",").map((size, index) => (
          <FormControlLabel
            key={index}
            value={size.trim()}
            control={<Radio />}
            label={size}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
