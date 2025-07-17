import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelServices';
import './style/style.scss';

const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(res => {
//     console.log(
//         res.data.results.forEach(e => {
//             console.log(e);
//         })
//     );
// });

marvelService.getCharacter(16).then(res => {
    console.log(res.data.results[0].name);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
