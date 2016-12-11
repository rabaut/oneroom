'use strict'

import 'css/index.css';

import React                   from 'react';
import * as Pixi               from 'pixi.js';
import Stats                   from 'stats.js';
import path                    from 'path';
import { render as renderUI }  from 'react-dom';
import { Provider }            from 'react-redux';
import { buildStore }          from './store';
import Root                    from './ui/root';
import { setupKeyboard }       from './keyboard';
import * as Entities           from './entities';
import * as Sprites            from './sprites';
import { start, started }      from './modules/game';
import { toggleVisibility }    from './modules/ui';
import { addEntity }           from './modules/entity';
import Rooms                   from '../rooms/first.json';
import { 
  Input, Physics, Collision, Movement
} from './systems';

var store, keyboard, mouse, stats, systems, stage, world, renderer, room, player;

store = setupStore();
store.dispatch(start());
setupUI();

function setupStore() {
  let store = buildStore();
  store.subscribe(handleStoreChange.bind(this));
  return store;
}

function handleStoreChange() {
  const state = store.getState();
  const { starting, started } = state.game;
  if(starting) { loadGame(); }
}

function setupUI() {
  stats = setupStats();
  renderUI(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('ui')
  );
}

function setupStats() {
  let stats = {};
  stats.game = new Stats();
  stats.render = new Stats();
  stats.game.dom.style.cssText = 'z-index:10000;margin-left:46px';
  stats.render.dom.style.cssText = 'z-index:10000;margin-left:46px';
  stats.game.showPanel(0);
  stats.render.showPanel(0);
  return stats;
}

function loadGame() {
  PIXI.loader
    .add('world', 'http://localhost:8080/assets/textures/sheets/world.json')
    .load(setupGame);
}

function setupGame() {
  const state = store.getState();
  keyboard = setupKeyboard();
  mouse    = {}; // replace
  stage    = new Pixi.Container();
  renderer = setupRenderer();
  room     = buildRoom();
  //player   = setupPlayer({name: "God"});
  store.dispatch(started());
  startGame();
}

function buildRoom() {
  let room = {};
  room.sprite = Sprites.room(Rooms.layers);
  stage.addChild(room.sprite);  
  return room;
}

function setupRenderer() {
   PIXI.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;
  const renderer = new Pixi.WebGLRenderer(800, 800);
  document.getElementById('game').appendChild(renderer.view);
  return renderer;
}

function setupPlayer(user) {
  let player = Entities.player(user);
  setupEntity(player);
  return player;
};

function setupEntity(entity) {
  store.dispatch(addEntity(entity));
}

function startGame() {
  requestAnimationFrame(render);
  update();
  console.log('starting');
  store.dispatch(started());
};

function update() {
  setTimeout(update, 16);
  const state = store.getState();
  const { player, entities, ui } = state;
  stats.game.begin();
  Input.update(store.dispatch, player, keyboard);
  World.update(store.dispatch, world);
  Movement.update(store.dispatch, entities);
  Physics.update(store.dispatch, entities);
  Collision.update(store.dispatch, entities);
  stats.game.end();
};

function render() {
  requestAnimationFrame(render);
  renderer.render(stage);
}
