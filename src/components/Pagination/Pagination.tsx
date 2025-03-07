import React, {useEffect, useState} from "react";
import styles from "./Pagination.module.css";
import {ReactComponent as ArrowLeft} from "../../assets/icons/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/icons/arrow-right.svg";
import {useAppSelector} from "../../services/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../services/hooks/useAppDispatch.ts";
import {renderFilms} from "../../services/actions/films.ts";
import {decreasePage, increasePage} from "../../services/slices/filmsSlice.ts";

const Pagination = () => {
    const {pages, currentPage, isLoading, params} = useAppSelector((store) => store.films);
    const [isDisabledLeft, setIsDisabledLeft] = useState(false);
    const [isDisabledRight, setIsDisabledRight] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentPage === 1) {
            setIsDisabledLeft(true)
        } else {
            setIsDisabledLeft(false)
        }
        if (currentPage === pages) {
            setIsDisabledRight(true)
        } else {
            setIsDisabledRight(false)
        }
    }, [isDisabledRight, isDisabledLeft, pages, currentPage]);

    const onRightClickHandler = () => {
        dispatch(renderFilms({...params, page: params.page + 1}));
        dispatch(increasePage());
    }

    const onLeftClickHandler = () => {
        dispatch(renderFilms({...params, page: params.page - 1}));
        dispatch(decreasePage());
    }

    if (isLoading || !pages) {
        return null;
    }


    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.btn} ${isDisabledLeft ? styles.btn__disabled : ''}`}
                type="button"
                disabled={isDisabledLeft}
                onClick={onLeftClickHandler}
            >
                <ArrowLeft/>
            </button>

            <span className={styles.page__number}>
          {params.page}
        </span>
            <button
                className={`${styles.btn} ${isDisabledRight ? styles.btn__disabled : ''}`}
                type="button"
                disabled={isDisabledRight}
                onClick={onRightClickHandler}
            >
                <ArrowRight/>
            </button>
        </div>
    );
};

export default Pagination;
