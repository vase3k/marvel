import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';
import './charPage.scss';

const CharPage = () => {
    const { charName } = useParams(),
        [char, setChar] = useState(null),
        { getCharacterByName, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
        //eslint-disable-next-line
    }, [charName]);

    const updateChar = () => {
        if (!charName) {
            return;
        }

        clearError();
        getCharacterByName(charName)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharLoaded = char => {
        setChar(char);
    };

    return (
        <>
            <AppBanner />
            {setContent(process, View, char)}
        </>
    );
};

const View = ({ data }) => {
    const { name, description, thumbnail } = data;
    return (
        <div className="char-page">
            <Helmet>
                <meta name="description" content={`${name} char page`} />
                <title>{name}</title>
            </Helmet>
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
