import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setDirection, setSorting }  from '../store/filters/filters-slice';
import { selectDirection, selectSorting } from '../store/filters/select';
import { SortDirection, SortingType } from '../types/common';

export const Sorting = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector(selectSorting);
  const direction = useAppSelector(selectDirection);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sorting === SortingType.Date ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick={() => dispatch(setSorting(SortingType.Date))}
        >
          по дате
        </button>
        <button
          className={`catalog-sort__type-button ${sorting === SortingType.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick={() => dispatch(setSorting(SortingType.Price))}
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${direction === SortDirection.Asc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={() => dispatch(setDirection(SortDirection.Asc))}
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${direction === SortDirection.Desc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={() => dispatch(setDirection(SortDirection.Desc))} 
        />
      </div>
    </div>
  );
}
