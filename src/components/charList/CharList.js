import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    state = {
        data: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: -3,
        charEnded: false,
    };

    marvel = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = offset => {
        this.onCharListLoading();
        this.marvel.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onCharListLoaded = newData => {
        let ended = false;
        if (newData.length === 0) {
            ended = true;
        }

        this.setState(({ data, offset }) => {
            const filteredNewData = newData.filter(
                newItem => !data.some(existingItem => existingItem.id === newItem.id)
            );

            return {
                data: [...data, ...filteredNewData],
                loading: false,
                newItemLoading: false,
                offset: offset + 3,
                charEnded: ended,
            };
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    itemRefs = [];

    setRef = ref => {
        if (!this.itemRefs.includes(ref)) {
            this.itemRefs.push(ref);
        }
    };

    focusOnItem = id => {
        this.itemRefs = this.itemRefs.filter(e => e !== null);
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    };

    renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                    onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { data, loading, error, newItemLoading, offset, charEnded } = this.state;
        const items = this.renderItems(data);

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
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
