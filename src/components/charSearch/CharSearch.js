import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelServices';

import './charSearch.scss';

const CharSearch = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { getCharacterByName } = useMarvelService();

    const onCharLoaded = char => {
        setChar(char);
        setLoading(false);
        setError(false);
    };

    const updateChar = name => {
        setLoading(true);
        setError(false);

        getCharacterByName(name)
            .then(onCharLoaded)
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required'),
            })}
            onSubmit={values => updateChar(values.name)}
        >
            <Form className="char__search">
                <h2 className="char__search-name">Or find a character by name:</h2>
                <Field
                    className="char__search-field"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                />
                <button type="submit" className="button button__main" disabled={loading}>
                    <div className="inner">{loading ? 'loading...' : 'Find'}</div>
                </button>
                {error && <NoNameError />}
                {char && <LinkMessage char={char} />}
                <ErrorMessage className="char__search-error" name="name" component="div" />
            </Form>
        </Formik>
    );
};

const NoNameError = () => {
    return (
        <>
            <div className="error">The character was not found. Check the name and try again</div>
        </>
    );
};

const LinkMessage = ({ char }) => {
    return (
        <div className="char__search-succes">
            <Link to={`/characters/${char.name}`}>{`There is! Visit ${char.name} page?`}</Link>
        </div>
    );
};

export default CharSearch;
