import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './singleComic.scss';

const SingleComic = props => {
    const [comic, setComic] = useState(null);
    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [props.comicId]);

    const updateComic = () => {
        const { comicId } = props;
        if (!comicId) {
            return;
        }

        clearError();
        getComic(comicId).then(onComicLoaded);
    };

    const onComicLoaded = comic => {
        setComic(comic);
    };

    const skeleton = comic || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ comic }) => {
    const { title, path, extension, description, price, pageCount, languages } = comic;
    return (
        <div className="single-comic">
            <img src={path + '.' + extension} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <a className="single-comic__back">Back to all</a>
        </div>
    );
};

export default SingleComic;
