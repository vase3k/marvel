import { useState, useEffect, useRef } from 'react';

import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = props => {
    const [data, setData] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(-3),
        [charEnded, setCharEnded] = useState(false);

    const marvel = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = offset => {
        onCharListLoading();
        marvel.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
    };

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onCharListLoaded = newData => {
        let ended = false;
        if (newData.length === 0) {
            ended = true;
        }

        const filteredNewData = newData.filter(
            newItem => !data.some(existingItem => existingItem.id === newItem.id)
        );

        setData([...data, ...filteredNewData]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 3);
        setCharEnded(ended);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    let itemRefs = useRef([]);

    const focusOnItem = id => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };

    const renderItems = arr => {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={elem => (itemRefs.current[i] = elem)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    };

    const items = renderItems(data);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char_list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : '' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
