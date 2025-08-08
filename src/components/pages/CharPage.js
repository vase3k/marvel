import CharPage from '../../components/CharPage/CharPage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SingleCharPage = () => {
    return (
        <>
            <ErrorBoundary>
                <CharPage />
            </ErrorBoundary>
        </>
    );
};

export default SingleCharPage;
