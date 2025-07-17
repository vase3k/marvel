class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getRessource = async url => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        return this.getRessource(`${this._apiBase}characters?&${this._apiKey}`);
    };

    getCharacter = async id => {
        return this.getRessource(`${this._apiBase}characters?${id}?&${this._apiKey}`);
    };
}

export default MarvelService;
