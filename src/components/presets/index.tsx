import React from 'react';

type PresetsProps = {
  defaultValue: number[];
  onPresetClick: (
    preset: Partial<{
      filter: string | number[];
      applyFilter: boolean;
      values: number[];
      colorOne: number[];
      colorTwo: number[];
    }>,
  ) => void;
};

const Presets: React.FC<PresetsProps> = ({ defaultValue, onPresetClick }: PresetsProps) => {
  return (
    <div>
      <div>
        <h4>Presets</h4>
        <button
          className="btn btn-sm"
          onClick={() => onPresetClick({ filter: defaultValue, values: defaultValue, applyFilter: true })}
        >
          None
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'invert', applyFilter: true })}>
          Invert
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'grayscale', applyFilter: true })}>
          Grayscale
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'sepia', applyFilter: true })}>
          Sepia
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            onPresetClick({
              applyFilter: true,
              filter: 'duotone',
              colorOne: [250, 50, 50],
              colorTwo: [20, 20, 100],
            })
          }
        >
          Duotone (red / blue)
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            onPresetClick({
              applyFilter: true,
              filter: 'duotone',
              colorOne: [50, 250, 50],
              colorTwo: [250, 20, 220],
            })
          }
        >
          Duotone (green / purple)
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            onPresetClick({
              applyFilter: true,
              filter: 'duotone',
              colorOne: [40, 250, 250],
              colorTwo: [250, 150, 30],
            })
          }
        >
          Duotone (light blue/orange)
        </button>
        <button
          className="btn btn-sm"
          onClick={() =>
            onPresetClick({
              filter: 'duotone',
              colorOne: [40, 70, 200],
              colorTwo: [220, 30, 70],
            })
          }
        >
          Duotone (blue / red)
        </button>
      </div>
    </div>
  );
};

export default Presets;
