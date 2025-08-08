import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import './charPage.scss';

const CharPage = () => {
    const { charName } = useParams();
    const [char, setChar] = useState(null);
    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charName]);

    const updateChar = () => {
        if (!charName) {
            return;
        }

        clearError();
        getCharacterByName(charName).then(onCharLoaded);
    };

    const onCharLoaded = char => {
        setChar(char);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ char }) => {
    console.log(char);
    const { name, description, thumbnail } = char;
    return (
        <div className="char-page">
            <img className="char-page__img" src={thumbnail} alt={name} />
            <div>
                <h2 className="char-page__name">{name}</h2>
                <p className="char-page__descr">{description}</p>
            </div>
            <Link to={'/'} className="single-char__back">
                Back to all
            </Link>
        </div>
    );
};

export default CharPage;
