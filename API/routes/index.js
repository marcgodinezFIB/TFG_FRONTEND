'use strict'

const express = require('express');
const app = express();
//const app = require('../app');
const api = express.Router();
const UserCtrl = require('../controllers/user')
const SongCtrl = require('../controllers/song')

const SpotifyWebApi = require('spotify-web-api-node')
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

var spotifyApi = new SpotifyWebApi({
    clientId: 'ce331aaee75142968efef0c40a8c69c9',
    clientSecret: 'cd0835d1e4f54270960b4d134a93bc4f',
    redirectUri: 'http://localhost:8888/callback'
});


app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);
            setInterval(async() => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

app.listen(8888, () =>
    console.log(
        'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
    )
);
api.get('/getUserPlaylists', SongCtrl.getUserPlaylists);
api.get('/getPlaylistTracks/:id', SongCtrl.getPlaylistTracks)
api.post('/signup', UserCtrl.signUp);
api.post('/signin', UserCtrl.signIn);
module.exports = api