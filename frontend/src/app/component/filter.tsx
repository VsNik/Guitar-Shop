import {useDispatch} from 'react-redux';
import {resetFilters, setStringCount, setType} from '../store/filters/filters-slice';
import { GuitarType } from '@guitar-shop/lib/types';

interface FilterProps {
  type: GuitarType[],
  stringCount: string[];
}

export const Filter: React.FC<FilterProps> = ({type, stringCount}) => {
  const dispatch = useDispatch();

  const handleResetFilters = () => {
    dispatch(resetFilters());
  }

  return (
    <div className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={(evt) => dispatch(setType(evt.target.name))}
            checked={type.includes(GuitarType.Acoustic) && true}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electro"
            name="electro"
            onChange={(evt) => dispatch(setType(evt.target.name))}
            checked={type.includes(GuitarType.Electro) && true}
          />
          <label htmlFor="electro">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={(evt) => dispatch(setType(evt.target.name))}
            checked={type.includes(GuitarType.Ukulele) && true}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            value={4}
            onChange={(evt) => dispatch(setStringCount(evt.target.value))}
            checked={stringCount.includes('4') && true}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            value={6}
            onChange={(evt) => dispatch(setStringCount(evt.target.value))}
            checked={stringCount.includes('6') && true}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            value={7}
            onChange={(evt) => dispatch(setStringCount(evt.target.value))}
            checked={stringCount.includes('7') && true}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            value={12}
            onChange={(evt) => dispatch(setStringCount(evt.target.value))}
            checked={stringCount.includes('12') && true}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        onClick={handleResetFilters}
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
      >
        Очистить
      </button>
    </div>
  );
}
