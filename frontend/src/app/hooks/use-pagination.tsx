import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setCurrentPage } from "../store/products/products-slice";


export const usePagination = (limit: number, total: number, blockLength: number) => {
    const dispatch = useAppDispatch();
    const [blockCount, setBlockCount] = useState(1);
    const [start, setStart] = useState<number>(1);
    const [end, setEnd] = useState<number>(blockLength + 1)
    const [currentBlock, setCurrentBlock] = useState(1);

    useEffect(() => {
        if (total && limit) {
            setBlockCount(Math.ceil(total / limit));
            setStart(blockLength * (currentBlock - 1) + 1);
        }
    }, [total, limit, currentBlock, blockLength]);

    const onNext = () => {
        if (start + blockLength - 1 < blockCount) {
          setCurrentBlock(currentBlock + 1);
          setEnd(end + blockLength);
          dispatch(setCurrentPage(end));
        }
    };
    
    const onPrev = () => {
        if (start - blockLength > 0) {
          setCurrentBlock(currentBlock - 1);
          setEnd(end - blockLength);
          dispatch(setCurrentPage(start - blockLength));
        }
    };

    return {
        blockCount,
        start,
        end,
        onPrev,
        onNext,
    }
}