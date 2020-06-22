import React from 'react';

import './style.scss';

import ImageFilter from 'react-image-filter';
import ImageUploader from 'react-images-upload';

import Sliders from '../sliders';
import useFilters, { NONE } from './state';
import Presets from '../presets';
import download from '../../utils/download';

const DEFAULT_IMAGE_KEY = new Date().getTime();

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

  const [imageKey, setImageKey] = React.useState<number>(DEFAULT_IMAGE_KEY);
  const [image, setImage] = React.useState<string>('');

  const onDrop = React.useCallback(
    (files: File[]) => {
      if (FileReader && files && files.length) {
        const fr = new FileReader();
        fr.onload = () => {
          setImage(fr.result as string);
          setImageKey(new Date().getTime());
        };

        fr.readAsDataURL(files[0]);
      }
    },
    [setImage, setImageKey],
  );

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

  const onDownloadClick = React.useCallback(() => {
    const svg = document.querySelector('.ImageFilter-svg');
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const data = new XMLSerializer().serializeToString(svg);
    const DOMURL: any = window.URL || window.webkitURL || window;

    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      const imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

      download(imgURI);
    };

    img.src = url;
  }, []);

  return (
    <div className="Content">
      {!image && (
        <ImageUploader
          withIcon={true}
          buttonText="Выберите изображение"
          onChange={onDrop}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
          label="Выберите или перенесите на эту область изображение"
        />
      )}

      {image && (
        <>
          <div className="ImageWrapper">
            <ImageFilter
              image={image}
              key={imageKey}
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

          <button className="btn btn-sm" onClick={onDownloadClick}>
            Скачать
          </button>
        </>
      )}
      {!image && <div style={{ height: '356px' }} />}
    </div>
  );
};

export default FilterScene;
