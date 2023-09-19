import { PaginateData, setCurrentPage } from "../store/products/products-slice";
import { usePagination } from "../hooks/use-pagination";
import { useAppDispatch } from "../store/hooks";

const CHUNK_LENGTH = 3;

interface PaginationProps {
  pagination: PaginateData;
}

export const Pagination: React.FC<PaginationProps> = ({pagination}) => {
  const {blockCount, start, end, onPrev, onNext} = usePagination(pagination.limit, pagination.total, CHUNK_LENGTH);
  const dispatch = useAppDispatch();

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {
          (start - CHUNK_LENGTH > 0) && (
              <li onClick={onPrev} className="pagination__page pagination__page--next" id="next">
                <span className="link pagination__page-link">Назад</span>
            </li>
          )
        }
        { 
          (pagination.total && pagination.total > CHUNK_LENGTH) && [...Array(blockCount + 1).keys()].slice( start, end ).map((item) => (
            <li 
              key={item} 
              className={`pagination__page ${pagination.page === item ? "pagination__page--active" : ""}`} 
              onClick={() => dispatch(setCurrentPage(item))}
            >
              <span className="link pagination__page-link">{ item }</span>
            </li>
          ))
        }
        {
          (start + CHUNK_LENGTH - 1 < blockCount) && (
            <li onClick={onNext} className="pagination__page pagination__page--next" id="next">
              <span className="link pagination__page-link">Далее</span>
            </li>
          )
        }
      </ul>
    </div>
  );
}
