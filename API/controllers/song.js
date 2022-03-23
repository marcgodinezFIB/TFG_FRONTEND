'use strict'

const service = require('../services')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Song = require('../models/song')

const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const { db } = require('../config')

var spotifyApi = new SpotifyWebApi({
    clientId: 'ce331aaee75142968efef0c40a8c69c9',
    clientSecret: 'cd0835d1e4f54270960b4d134a93bc4f',
    redirectUri: 'http://localhost:8888/callback'
});

const token = 'BQAWnIoyr0m-5XT4eeWGZXxFRLzq_wFrDU76qTnV2nwD1SRyS8UjuuQ8JjbGhjjSNF6wD52VYIWzcrvRDFh8YTUId5XSVLEF4V3c6Ufl4aRa3jglmJkOcTrUoqjjRFfdmrPQJDwmZcwqFIzw1GQ3MhnR6B89orQHjRYTPlYSSYRiRHWe3bqsWDNUIAmVVYbjTSyLE0cUgffqiMM0Fb0ZxrMazSloOIxVH7tQ7BMpXR33FB-G3roAm4INq44l_IXuAnp3i_1fdybMcDLGCYGQtzAd_15KX4SRUAnFaAeRuDqpUSVwUTgb'
const refres_code = 'AQBhJUy8p-HVJvPmB67VyjsTaHUg579zp97xZFBy9QwuGTcl3b0bZkIP8VQl_K5bQ67OZYwz8Po9l_cF9tKVA-M69fezTZOOWXqnTS7solvCk5FJ92JAZxS3hLwpAM8psko'
spotifyApi.setAccessToken(token);


async function getUserPlaylists(req, res) {
    console.log("entro aqui")
    spotifyApi.setAccessToken(token);
    const me = await spotifyApi.getMe();
    const userName = me.body.id;
    const a = await spotifyApi.getUserPlaylists(userName);
    //console.log(a.body.items)
    var playlists = []
    for (let i = 0; i < a.body.items.length; ++i) {
        playlists.push(a.body.items[i].name);
        console.log(a.body.items[i].name);
    }
    console.log("llego")
    return res.status(500);
}


async function getPlaylistTracks() {
    const data = await spotifyApi.getPlaylistTracks(req.params.id, {
        offset: 1,
        limit: 100,
        fields: 'items'
    })
    let tracks = [];
    var count = 0;
    for (let track_obj of data.body.items) {
        const track = track_obj.track
        tracks.push(track);
        let newSong = new Song({
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            apparences: 0,
            votes: 0
        });
        Song.findOne({
            name: newSong.name,
            artist: newSong.artist,
            album: newSong.album
        }, (err, song) => {
            if (!song) {
                count = count + 1;
                console.log(count)
                newSong.save();
            } else console.log(song.name);
        })
        console.log(tracks);
    }

}



async function getPlaylistTracks(req, res) {
    const data = await spotifyApi.getPlaylistTracks(req.params.id, {
        limit: 100,
        fields: 'items'
    })
    for (let track_obj of data.body.items) {
        let newSong = new Song({
            name: track_obj.track.name,
            artist: track_obj.track.artists[0].name,
            album: track_obj.track.album.name,
            apparences: 0,
            votes: 0
        });
        Song.findOne({
            name: newSong.name,
        }, (err, song) => {
            if (err) return res.status(500);
            if (!song) {
                newSong.save();
            }
        })
    }
    return res.status(200);
}

module.exports = {
    getUserPlaylists,
    getPlaylistTracks
}