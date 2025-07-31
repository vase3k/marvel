import SingleComic from '../../components/singleComic/SingleComicPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SingleComicPage = () => {
    return (
        <>
            <ErrorBoundary>
                <SingleComic />
            </ErrorBoundary>
        </>
    );
};

export default SingleComicPage;
