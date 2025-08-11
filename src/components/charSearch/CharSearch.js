import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelServices';

import './charSearch.scss';

const setContent = (process, data) => {
    switch (process) {
        case 'waiting': {
            return;
        }
        case 'loading': {
            return;
        }
        case 'confirmed': {
            return <LinkMessage char={data} />;
        }
        case 'error': {
            return <NoNameError />;
        }
        default:
            throw new Error('Unexpected process state');
    }
};

const CharSearch = () => {
    const [char, setChar] = useState(null);
    const { getCharacterByName, process, setProcess } = useMarvelService();

    const onCharLoaded = char => {
        setChar(char);
    };

    const updateChar = name => {
        setProcess('loading');
        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('error'));
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
            validateOnChange={true}
        >
            <Form className="char__search" onChange={() => setProcess('waiting')}>
                <h2 className="char__search-name">Or find a character by name:</h2>
                <Field
                    className="char__search-field"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                />
                <button
                    type="submit"
                    className="button button__main"
                    disabled={process === 'loading'}
                >
                    <div className="inner">{process === 'loading' ? 'loading...' : 'Find'}</div>
                </button>
                {setContent(process, char)}
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
