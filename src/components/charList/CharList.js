import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import nextId from 'react-id-generator';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            error: false,
        };
    }

    marvel = new MarvelService();

    componentDidMount() {
        this.marvel.getAllCharacters().then(this.onCharListLoaded).catch(this.onError);
    }

    onCharListLoaded = data => {
        this.setState({
            data,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    renderItems(arr) {
        const items = arr.map(item => {
            const id = nextId();
            return (
                <li className="char__item" key={id}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    render() {
        const { data, loading, error } = this.state;
        const items = this.renderItems(data.slice(0, 9));

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char_list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
