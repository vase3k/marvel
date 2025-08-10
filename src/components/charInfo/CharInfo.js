import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = props => {
    const [char, setChar] = useState(null);
    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharLoaded = char => {
        setChar(char);
    };

    return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">All-Winners Squad: Band of Heroes (2011) #3</li>
                <li className="char__comics-item">Alpha Flight (1983) #50</li>
                <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
                <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">Vengeance (2011) #4</li>
                <li className="char__comics-item">Avengers (1963) #1</li>
                <li className="char__comics-item">Avengers (1996) #1</li>
            </ul>
        </>
    );
};

export default CharInfo;
