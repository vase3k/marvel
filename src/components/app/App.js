import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../../components/comicsList/ComicsList';
import SingleComic from '../../components/singleComic/SingleComic';
import AppBanner from '../../components/appBanner/AppBanner';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null),
        [selectedComic, setSelectedComic] = useState(null);

    const onCharSelected = id => {
        setSelectedChar(id);
    };

    const onComicSelected = id => {
        setSelectedComic(id);
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
            <>
                <AppHeader />
                <AppBanner />
                <ComicsList onComicSelected={onComicSelected} />
                <SingleComic comicId={selectedComic} />
            </>
        </div>
    );
};

export default App;
