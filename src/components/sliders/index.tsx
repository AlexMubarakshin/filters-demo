import React from 'react';

type SlidersProps = {
  labels: string[];
  values: any[];
  handleChange(index: number, value: string);
};

const Sliders: React.FC<SlidersProps> = ({ labels, values, handleChange }: SlidersProps) => (
  <div className="Controls">
    {values.map((value, index) => (
      <div className="Control" key={index}>
        {labels[index]}: {parseFloat(value).toFixed(2)}
        <input
          className="Control-input"
          type="range"
          min={-1}
          max={2}
          step={0.1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      </div>
    ))}
  </div>
);

export default Sliders;
