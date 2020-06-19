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
        <h4>Пресеты</h4>
        <button
          className="btn btn-sm"
          onClick={() => onPresetClick({ filter: defaultValue, values: defaultValue, applyFilter: true })}
        >
          Не выбрано
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'invert', applyFilter: true })}>
          Инвертировать
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'grayscale', applyFilter: true })}>
          Оттенки серого
        </button>
        <button className="btn btn-sm" onClick={() => onPresetClick({ filter: 'sepia', applyFilter: true })}>
          Сепия
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
          Дуотон (красно-синий)
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
          Дуотон (Зелено-фиолетовый)
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
          Дуотон (Сине-оранжевый)
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
          Дуотон (Сине-красный)
        </button>
      </div>
    </div>
  );
};

export default Presets;
