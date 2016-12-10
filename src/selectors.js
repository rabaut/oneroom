import { createSelector } from 'reselect';

const getUser       = state => state.api.user;
const getPlayers    = state => state.api.players;
const getPlayerName = state => state.game.playerName;
const getMap        = state => state.api.map;

export const getAuthenticated = createSelector( [getUser], user => (user ? true : false));

export const getLoaded = createSelector( [getPlayers, getMap], (players, map) => (players && map ? true : false));
