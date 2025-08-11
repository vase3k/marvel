import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': {
            return <Spinner />;
        }
        case 'loading': {
            return newItemLoading ? <Component /> : <Spinner />;
        }
        case 'confirmed': {
            return <Component />;
        }
        case 'error': {
            return <ErrorMessage />;
        }
        default:
            throw new Error('Unexpected process state');
    }
};

const ComicsList = () => {
    const [comics, setComics] = useState([]),
        [newComicLoading, setNewComicLoading] = useState(false),
        [offset, setOffset] = useState(-4),
        [comicEnded, setComicEnded] = useState(false);

    const { getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest();
        //eslint-disable-next-line
    }, []);

    const onRequest = offset => {
        setNewComicLoading(true);
        getAllComics(offset)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'));
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

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), newComicLoading)}
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
