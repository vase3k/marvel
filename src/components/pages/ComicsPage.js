import { useState } from 'react';
import ComicsList from '../../components/comicsList/ComicsList';
import SingleComic from '../../components/singleComic/SingleComic';
import AppBanner from '../../components/appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = () => {
    const [selectedComic, setSelectedComic] = useState(null);

    const onComicSelected = id => {
        setSelectedComic(id);
    };

    return (
        <>
            <AppBanner />
            <ComicsList onComicSelected={onComicSelected} />
            <SingleComic comicId={selectedComic} />
        </>
    );
};

export default ComicsPage;
