class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    _baseOffset = 0;

    getRessource = async url => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getRessource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async id => {
        const res = await this.getRessource(`${this._apiBase}characters?&${this._apiKey}`).then(
            res => res.data.results.filter(item => item.id === id)
        );
        return this._transformCharacter(res[0]);
    };

    _transformCharacter = char => {
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
}

export default MarvelService;
