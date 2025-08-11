import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';

const SingleComic = () => {
    const { comicId } = useParams(),
        [comic, setComic] = useState(null),
        { getComic, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateComic();
        //eslint-disable-next-line
    }, [comicId]);

    const updateComic = () => {
        clearError();

        if (!comicId) {
            return;
        }

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onComicLoaded = comic => {
        setComic(comic);
    };

    return (
        <>
            <AppBanner />
            {setContent(process, View, comic)}
        </>
    );
};

const View = ({ data }) => {
    const { title, path, extension, description, price, pageCount, languages } = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={`${title} comics book`} />
                <title>{title}</title>
            </Helmet>
            <img src={path + '.' + extension} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComic;
