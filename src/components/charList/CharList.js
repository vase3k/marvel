import { useState, useEffect, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = props => {
    const [data, setData] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(-3),
        [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = offset => {
        setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
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
        setNewItemLoading(false);
        setOffset(offset => offset + 3);
        setCharEnded(ended);
    };

    const focusOnItem = ref => {
        ref.current.classList.add('char__item_selected');
        ref.current.focus();
    };

    const blurOnItem = ref => {
        ref.current.classList.remove('char__item_selected');
    };

    const renderItems = arr => {
        const items = arr.map(item => {
            const itemRef = createRef(null);

            return (
                <CSSTransition
                    key={item.id}
                    in={true}
                    timeout={500}
                    classNames="char__item"
                    nodeRef={itemRef}
                >
                    <li
                        className="char__item"
                        key={item.id}
                        tabIndex={0}
                        ref={itemRef}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(itemRef);
                        }}
                        onBlur={() => blurOnItem(itemRef)}
                        onKeyDown={e => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(item.id);
                                focusOnItem(itemRef);
                            }
                        }}
                    >
                        <img src={item.thumbnail} alt={item.name} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    };

    const items = renderItems(data);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div className="char_list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
