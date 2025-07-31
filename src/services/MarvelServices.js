import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/',
        _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df',
        _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    };

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters?&${_apiKey}`).then(res =>
            res.data.results.filter(item => item.id === id)
        );
        return _transformCharacter(res[0]);
    };

    const getComic = async id => {
        const res = await request(`${_apiBase}comics?&${_apiKey}`).then(res =>
            res.data.results.filter(item => item.id == id)
        );
        return _transformComic(res[0]);
    };

    const _transformCharacter = char => {
        let thumbnail;
        if (
            char.thumbnail.path ===
            'https://www.wallpaperflare.com/static/264/707/824/iron-man-the-avengers-robert-downey-junior-tony-wallpaper'
        ) {
            thumbnail = 'https://i.pinimg.com/736x/d7/09/a0/d709a0e9416d99e7b1487b714f81d368.jpg';
        } else {
            thumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
        }

        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : 'there is no description for this character',
            thumbnail,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };

    const _transformComic = ({
        description,
        id,
        pageCount,
        prices: [{ price }],
        thumbnail: { extension, path },
        textObjects: { languages },
        title,
    }) => {
        return {
            description,
            id,
            pageCount,
            price,
            extension,
            languages,
            path,
            title,
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComic,
    };
};

export default useMarvelService;
