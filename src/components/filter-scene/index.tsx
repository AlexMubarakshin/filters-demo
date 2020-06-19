import React from 'react';

import './style.scss';

import ImageFilter from 'react-image-filter';
import Sliders from '../sliders';
import useFilters from './state';
import Presets from '../presets';

const NONE = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

const labels = [
  'Red to Red',
  'Green to Red',
  'Blue to Red',
  'Alpha to Red',
  'Add to Red',
  'Red to Green',
  'Green to Green',
  'Blue to Green',
  'Alpha to Green',
  'Add to Green',
  'Red to Blue',
  'Green to Blue',
  'Blue to Blue',
  'Alpha to Blue',
  'Add to Blue',
  'Red to Alpha',
  'Green to Alpha',
  'Blue to Alpha',
  'Alpha to Alpha',
  'Add to Alpha',
];

type FilterSceneProps = unknown;

const FilterScene: React.FC = () => {
  const [
    { applyFilter, colorOne, colorTwo, filter, values },
    onControlChange,
    toggleFilters,
    setValues,
    setFirstColor,
    setSecondColor,
    setFilter,
  ] = useFilters();

  const [currentKey, setCurrentKey] = React.useState(new Date().getTime());

  const onChangeImageClick = React.useCallback(() => {
    setCurrentKey(new Date().getTime());
  }, [setCurrentKey]);

  const onPresetClick = React.useCallback(
    (
      preset: Partial<{
        filter: string | number[];
        applyFilter: boolean;
        values: number[];
        colorOne: number[];
        colorTwo: number[];
      }>,
    ): void => {
      if (preset.applyFilter !== undefined) {
        toggleFilters(preset.applyFilter);
      }

      if (preset.colorOne) {
        setFirstColor(preset.colorOne);
      }

      if (preset.colorTwo) {
        setSecondColor(preset.colorTwo);
      }

      if (preset.values) {
        setValues(preset.values);
      }

      if (preset.filter) {
        setFilter(preset.filter);
      }
    },
    [toggleFilters, setFirstColor, setSecondColor, setValues, setFilter],
  );

  const onToggleFiltersClick = React.useCallback(() => toggleFilters(!applyFilter), [toggleFilters, applyFilter]);

  return (
    <div className="Content">
      <div className="ImageWrapper">
        <ImageFilter
          // image={ 'https://amazingslider.com/wp-content/uploads/2012/12/dandelion.jpg' }
          image={`https://source.unsplash.com/random/1200x800?time=${currentKey}`}
          key={currentKey}
          // preserveAspectRatio='cover'
          // style={ { width: '100%', height: 300 } }
          filter={applyFilter ? filter : NONE}
          colorOne={colorOne}
          colorTwo={colorTwo}
          onChange={setValues}
        />
      </div>

      <Sliders labels={labels} values={values} handleChange={onControlChange} />

      <Presets defaultValue={NONE} onPresetClick={onPresetClick} />

      <h4>Разное</h4>

      <button className="btn btn-sm" onClick={onToggleFiltersClick}>
        Фильтры {applyFilter ? 'Выключить' : 'Включить'}
      </button>

      <button className="btn btn-sm" onClick={onChangeImageClick}>
        Новое изображение
      </button>
    </div>
  );
};

export default FilterScene;
