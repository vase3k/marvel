import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const [comics, setComics] = useState([]),
        [newComicLoading, setNewComicLoading] = useState(false),
        [offset, setOffset] = useState(-4),
        [comicEnded, setComicEnded] = useState(false);

    const { getAllComics, error, loading } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = offset => {
        setNewComicLoading(true);
        getAllComics(offset).then(onComicListLoaded);
    };

    const onComicListLoaded = newData => {
        let ended = false;
        if (newData.length === 0) {
            ended = true;
        }
        const filteredNewData = newData.filter(
            newItem => !comics.some(existingItem => existingItem.id === newItem.id)
        );

        setComics([...comics, ...filteredNewData]);
        setNewComicLoading(false);
        setOffset(offset => offset + 4);
        setComicEnded(ended);
    };

    const renderItems = arr => {
        const items = arr.map(({ title, path, extension, id, description, price }) => {
            return (
                <li className="comics__item" key={id}>
                    <Link to={`/comics/${id}`}>
                        <img
                            alt={title}
                            src={path + '.' + extension}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{description}</div>
                        <div className="comics__item-price">{price}$</div>
                    </Link>
                </li>
            );
        });

        return <ul className="comics__grid">{items}</ul>;
    };

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newComicLoading}
                style={{ display: comicEnded ? 'none' : '' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
