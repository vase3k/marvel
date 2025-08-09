import { Helmet } from 'react-helmet';
import ComicsList from '../../components/comicsList/ComicsList';
import AppBanner from '../../components/appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of our comics" />
                <title>Comics page</title>
            </Helmet>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;
