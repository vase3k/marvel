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
        offset: 9,
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
        this.setState(({ data, offset }) => ({
            data: [...data, ...newData],
            loading: false,
            newItemLoading: false,
            offset: offset + 3,
        }));
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    renderItems(arr) {
        const items = arr.map(item => {
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { data, loading, error, newItemLoading, offset } = this.state;
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
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
